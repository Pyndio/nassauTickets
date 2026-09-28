const express = require('express')

const cors = require('cors')

const mysql = require('mysql2')

const app = express()

const PORT = 3000

app.use(cors())

app.use(express.json())

const banco = mysql.createConnection({

  host: 'localhost',

  user: 'root',

  password: 'Taturana@9000',

  database: 'nassau_tickets'

})

banco.connect((erro) => {

  if (erro) {

    console.error('Erro ao conectar ao MySQL:', erro.message)

    return

  }

  console.log('MySQL conectado com sucesso!')

})

let quantidadeChamadas = 0

const fila = []

let atendimentoAtual = null

app.get('/', (req, res) => {

  res.json({

    mensagem: 'Nassau Tickets API funcionando!'

  })

})

app.post('/senhas', (req, res) => {

  const { tipo } = req.body

  if (!['SP', 'SE', 'SG'].includes(tipo)) {

    return res.status(400).json({

      erro: 'Tipo de senha inválido. Use SP, SE ou SG.'

    })

  }

  const sqlNumero = `

    SELECT COALESCE(

      MAX(CAST(SUBSTRING(codigo, 3) AS UNSIGNED)),

      0

    ) AS ultimo

    FROM senhas

    WHERE tipo = ?

      AND DATE(data_criacao) = CURDATE()

      AND codigo REGEXP '^[A-Z]{2}[0-9]{3}$'

  `

  banco.query(

    sqlNumero,

    [tipo],

    (erro, resultado) => {

      if (erro) {

        console.error(
          'Erro ao consultar último número:',
          erro.message
        )

        return res.status(500).json({

          erro: 'Não foi possível consultar o número da senha.'

        })

      }

      const ultimoNumero = Number(resultado[0].ultimo)

      const numero = ultimoNumero + 1

      const senha = `${tipo}${String(numero).padStart(3, '0')}`

      const sql = `

        INSERT INTO senhas (
          codigo,
          tipo,
          status,
          numero_chamadas
        )

        VALUES (?, ?, 'AGUARDANDO', 0)

      `

      banco.query(

        sql,

        [senha, tipo],

        (erro) => {

          if (erro) {

            console.error(
              'Erro ao salvar senha:',
              erro.message
            )

            return res.status(500).json({

              erro: 'Não foi possível salvar a senha no banco.'

            })

          }

          fila.push(senha)

          res.status(201).json({

            mensagem: 'Senha gerada com sucesso!',

            senha: senha

          })

        }

      )

    }

  )

})

app.get('/fila', (req, res) => {

  res.json({

    fila: fila

  })

})

app.post('/fila/proxima', (req, res) => {

  if (atendimentoAtual) {

    return res.status(409).json({

      erro: 'Já existe uma senha em atendimento.'

    })

  }

  if (fila.length === 0) {

    return res.status(404).json({

      erro: 'Não existem senhas aguardando.'

    })

  }

  let senhaParaChamar = null

  const filaSP = fila.find((senha) =>

    senha.startsWith('SP')

  )

  const filaSE = fila.find((senha) =>

    senha.startsWith('SE')

  )

  const filaSG = fila.find((senha) =>

    senha.startsWith('SG')

  )

  if (quantidadeChamadas % 2 === 0) {

    if (filaSP) {

      senhaParaChamar = filaSP

    }

  } else {

    if (filaSE) {

      senhaParaChamar = filaSE

    } else if (filaSG) {

      senhaParaChamar = filaSG

    }

  }

  if (!senhaParaChamar) {

    senhaParaChamar = fila[0]

  }

  const indice = fila.indexOf(senhaParaChamar)

  fila.splice(indice, 1)

  quantidadeChamadas++

  atendimentoAtual = {

    senha: senhaParaChamar,

    status: 'CHAMADA',

    quantidadeChamadas: 1

  }

  const sql = `

    UPDATE senhas

    SET status = 'CHAMADA',

        numero_chamadas = 1

    WHERE codigo = ?

  `

  banco.query(

    sql,

    [senhaParaChamar],

    (erro) => {

      if (erro) {

        console.error(
          'Erro ao atualizar senha:',
          erro.message
        )

        return res.status(500).json({

          erro: 'Não foi possível atualizar a senha no banco.'

        })

      }

      res.json({

        mensagem: 'Senha chamada com sucesso!',

        senha: senhaParaChamar,

        status: 'CHAMADA'

      })

    }

  )

})

app.post('/fila/rechamar', (req, res) => {

  if (!atendimentoAtual) {

    return res.status(404).json({

      erro: 'Não existe uma senha em atendimento.'

    })

  }

  if (atendimentoAtual.status === 'CHAMADA') {

    atendimentoAtual.status = 'CHAMADA NOVAMENTE'

    atendimentoAtual.quantidadeChamadas++

    banco.query(

      `

        UPDATE senhas

        SET status = 'CHAMADA NOVAMENTE',

            numero_chamadas = 2

        WHERE codigo = ?

      `,

      [atendimentoAtual.senha],

      (erro) => {

        if (erro) {

          console.error(
            'Erro ao rechamar senha:',
            erro.message
          )

          return res.status(500).json({

            erro: 'Não foi possível atualizar a senha.'

          })

        }

        res.json({

          mensagem: 'Senha rechamada.',

          senha: atendimentoAtual.senha,

          status: 'CHAMADA NOVAMENTE'

        })

      }

    )

    return

  }

  if (atendimentoAtual.status === 'CHAMADA NOVAMENTE') {

    atendimentoAtual.status = 'NÃO COMPARECEU'

    banco.query(

      `

        UPDATE senhas

        SET status = 'NÃO COMPARECEU'

        WHERE codigo = ?

      `,

      [atendimentoAtual.senha],

      (erro) => {

        if (erro) {

          console.error(
            'Erro ao atualizar senha:',
            erro.message
          )

          return res.status(500).json({

            erro: 'Não foi possível atualizar a senha.'

          })

        }

        atendimentoAtual = null

        res.json({

          mensagem: 'Senha registrada como não compareceu.',

          status: 'NÃO COMPARECEU'

        })

      }

    )

    return

  }

  res.status(409).json({

    erro: 'Essa senha não pode ser rechamada neste momento.'

  })

})

app.post('/fila/iniciar', (req, res) => {

  if (!atendimentoAtual) {

    return res.status(404).json({

      erro: 'Não existe uma senha em atendimento.'

    })

  }

  if (

    atendimentoAtual.status !== 'CHAMADA' &&

    atendimentoAtual.status !== 'CHAMADA NOVAMENTE'

  ) {

    return res.status(409).json({

      erro: 'Essa senha não pode iniciar atendimento.'

    })

  }

  atendimentoAtual.status = 'EM ATENDIMENTO'

  banco.query(

    `

      UPDATE senhas

      SET status = 'EM ATENDIMENTO'

      WHERE codigo = ?

    `,

    [atendimentoAtual.senha],

    (erro) => {

      if (erro) {

        console.error(
          'Erro ao iniciar atendimento:',
          erro.message
        )

        return res.status(500).json({

          erro: 'Não foi possível atualizar a senha.'

        })

      }

      res.json({

        mensagem: 'Atendimento iniciado.',

        senha: atendimentoAtual.senha,

        status: 'EM ATENDIMENTO'

      })

    }

  )

})

app.post('/fila/finalizar', (req, res) => {

  if (!atendimentoAtual) {

    return res.status(404).json({

      erro: 'Não existe uma senha em atendimento.'

    })

  }

  if (atendimentoAtual.status !== 'EM ATENDIMENTO') {

    return res.status(409).json({

      erro: 'Essa senha não está em atendimento.'

    })

  }

  const senhaFinalizada = atendimentoAtual.senha

  banco.query(

    `

      UPDATE senhas

      SET status = 'ATENDIDA'

      WHERE codigo = ?

    `,

    [senhaFinalizada],

    (erro) => {

      if (erro) {

        console.error(
          'Erro ao finalizar atendimento:',
          erro.message
        )

        return res.status(500).json({

          erro: 'Não foi possível finalizar o atendimento.'

        })

      }

      atendimentoAtual = null

      res.json({

        mensagem: 'Atendimento finalizado.',

        senha: senhaFinalizada,

        status: 'ATENDIDA'

      })

    }

  )

})

app.get('/fila/atendimento-atual', (req, res) => {

  res.json({

    atendimento: atendimentoAtual

  })

})

app.listen(PORT, () => {

  console.log(`Servidor rodando em http://localhost:${PORT}`)

})