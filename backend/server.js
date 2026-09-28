require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const banco = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Testa a conexão ao subir o servidor (mesmo comportamento do .connect() original)
;(async () => {
  try {
    const conexao = await banco.getConnection()
    conexao.release()
    console.log('MySQL conectado com sucesso!')
  } catch (erro) {
    console.error('Erro ao conectar ao MySQL:', erro.message)
  }
})()

// Envolve rotas async para mandar qualquer erro direto pro middleware de erro no final
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next)

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

async function obterFila() {
  const [linhas] = await banco.query(
    `SELECT id, codigo FROM senhas WHERE status = 'AGUARDANDO' ORDER BY data_criacao ASC`
  )
  return linhas
}

async function obterAtendimentoAtual() {
  const [linhas] = await banco.query(
    `SELECT id, codigo, tipo, status, numero_chamadas, data_ultima_chamada
     FROM senhas
     WHERE status IN ('CHAMADA', 'CHAMADA NOVAMENTE', 'EM ATENDIMENTO')
     ORDER BY data_ultima_chamada DESC
     LIMIT 1`
  )
  return linhas[0] || null
}

// ==========================================
// ROTA INICIAL
// ==========================================

app.get('/', (req, res) => {
  res.json({ mensagem: 'Nassau Tickets API funcionando!' })
})

// ==========================================
// GERAR SENHA
// ==========================================

app.post('/senhas', wrap(async (req, res) => {
  const { tipo } = req.body

  if (!['SP', 'SE', 'SG'].includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo de senha inválido. Use SP, SE ou SG.' })
  }

  const [[{ ultimo }]] = await banco.query(
    `SELECT COALESCE(MAX(CAST(SUBSTRING(codigo, 3) AS UNSIGNED)), 0) AS ultimo
     FROM senhas
     WHERE tipo = ? AND DATE(data_criacao) = CURDATE() AND codigo REGEXP '^[A-Z]{2}[0-9]{3}$'`,
    [tipo]
  )

  const numero = Number(ultimo) + 1
  const senha = `${tipo}${String(numero).padStart(3, '0')}`

  await banco.query(
    `INSERT INTO senhas (codigo, tipo, status, numero_chamadas) VALUES (?, ?, 'AGUARDANDO', 0)`,
    [senha, tipo]
  )

  res.status(201).json({ mensagem: 'Senha gerada com sucesso!', senha })
}))

// ==========================================
// ÚLTIMA SENHA EMITIDA
// ==========================================

app.get('/senhas/ultima', wrap(async (req, res) => {
  const [linhas] = await banco.query(`SELECT codigo FROM senhas ORDER BY id DESC LIMIT 1`)
  res.json({ senha: linhas[0]?.codigo ?? null })
}))

// ==========================================
// CONSULTAR FILA
// ==========================================

app.get('/fila', wrap(async (req, res) => {
  const fila = await obterFila()
  res.json({ fila: fila.map((s) => s.codigo) })
}))

// ==========================================
// CHAMAR PRÓXIMA SENHA
// ==========================================

app.post('/fila/proxima', wrap(async (req, res) => {
  const atual = await obterAtendimentoAtual()

  if (atual) {
    return res.status(409).json({ erro: 'Já existe uma senha em atendimento.' })
  }

  const fila = await obterFila()

  if (fila.length === 0) {
    return res.status(404).json({ erro: 'Não existem senhas aguardando.' })
  }

  const filaSP = fila.find((s) => s.codigo.startsWith('SP'))
  const filaSE = fila.find((s) => s.codigo.startsWith('SE'))
  const filaSG = fila.find((s) => s.codigo.startsWith('SG'))

  const [[{ total }]] = await banco.query(
    `SELECT COUNT(*) AS total FROM senhas
     WHERE numero_chamadas >= 1 AND DATE(data_ultima_chamada) = CURDATE()`
  )

  let senhaParaChamar = null

  if (Number(total) % 2 === 0) {
    if (filaSP) senhaParaChamar = filaSP
  } else if (filaSE) {
    senhaParaChamar = filaSE
  } else if (filaSG) {
    senhaParaChamar = filaSG
  }

  if (!senhaParaChamar) senhaParaChamar = fila[0]

  const [resultado] = await banco.query(
    `UPDATE senhas SET status = 'CHAMADA', numero_chamadas = 1, data_ultima_chamada = NOW()
     WHERE id = ? AND status = 'AGUARDANDO'`,
    [senhaParaChamar.id]
  )

  if (resultado.affectedRows === 0) {
    return res.status(409).json({ erro: 'A senha não está mais disponível para chamada.' })
  }

  res.json({
    mensagem: 'Senha chamada com sucesso!',
    senha: senhaParaChamar.codigo,
    status: 'CHAMADA'
  })
}))

// ==========================================
// RECHAMAR
// ==========================================

app.post('/fila/rechamar', wrap(async (req, res) => {
  const atual = await obterAtendimentoAtual()

  if (!atual) {
    return res.status(404).json({ erro: 'Não existe uma senha em atendimento.' })
  }

  if (atual.status === 'CHAMADA') {
    await banco.query(
      `UPDATE senhas SET status = 'CHAMADA NOVAMENTE', numero_chamadas = 2, data_ultima_chamada = NOW()
       WHERE id = ?`,
      [atual.id]
    )

    return res.json({
      mensagem: 'Senha rechamada.',
      senha: atual.codigo,
      status: 'CHAMADA NOVAMENTE'
    })
  }

  if (atual.status === 'CHAMADA NOVAMENTE') {
    await banco.query(`UPDATE senhas SET status = 'NÃO COMPARECEU' WHERE id = ?`, [atual.id])

    return res.json({
      mensagem: 'Senha registrada como não compareceu.',
      senha: atual.codigo,
      status: 'NÃO COMPARECEU'
    })
  }

  res.status(409).json({ erro: 'Essa senha não pode ser rechamada neste momento.' })
}))

// ==========================================
// INICIAR ATENDIMENTO
// ==========================================

app.post('/fila/iniciar', wrap(async (req, res) => {
  const atual = await obterAtendimentoAtual()

  if (!atual) {
    return res.status(404).json({ erro: 'Não existe uma senha em atendimento.' })
  }

  if (atual.status !== 'CHAMADA' && atual.status !== 'CHAMADA NOVAMENTE') {
    return res.status(409).json({ erro: 'Essa senha não pode iniciar atendimento.' })
  }

  await banco.query(`UPDATE senhas SET status = 'EM ATENDIMENTO' WHERE id = ?`, [atual.id])

  res.json({ mensagem: 'Atendimento iniciado.', senha: atual.codigo, status: 'EM ATENDIMENTO' })
}))

// ==========================================
// FINALIZAR ATENDIMENTO
// ==========================================

app.post('/fila/finalizar', wrap(async (req, res) => {
  const atual = await obterAtendimentoAtual()

  if (!atual) {
    return res.status(404).json({ erro: 'Não existe uma senha em atendimento.' })
  }

  if (atual.status !== 'EM ATENDIMENTO') {
    return res.status(409).json({ erro: 'Essa senha não está em atendimento.' })
  }

  await banco.query(`UPDATE senhas SET status = 'ATENDIDA' WHERE id = ?`, [atual.id])

  res.json({ mensagem: 'Atendimento finalizado.', senha: atual.codigo, status: 'ATENDIDA' })
}))

// ==========================================
// ATENDIMENTO ATUAL
// ==========================================

app.get('/fila/atendimento-atual', wrap(async (req, res) => {
  const atendimento = await obterAtendimentoAtual()
  res.json({ atendimento })
}))

// ==========================================
// HISTÓRICO DO PAINEL
// ==========================================

app.get('/fila/historico', wrap(async (req, res) => {
  const [linhas] = await banco.query(
    `SELECT codigo FROM senhas WHERE numero_chamadas >= 1 ORDER BY data_ultima_chamada DESC LIMIT 5`
  )
  res.json({ historico: linhas.map((s) => s.codigo) })
}))

// ==========================================
// MIDDLEWARE DE ERRO (centraliza log + resposta 500 de todas as rotas)
// ==========================================

app.use((erro, req, res, next) => {
  console.error('Erro na API:', erro.message)
  res.status(500).json({ erro: 'Erro interno no servidor. Tente novamente.' })
})

// ==========================================
// SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})