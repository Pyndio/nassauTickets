import { useEffect, useState } from 'react'
import Totem from './pages/Totem'
import Guiche from './pages/Guiche'
import PainelPublico from './pages/PainelPublico'

// Endereço base da API. Fica num só lugar — se um dia trocar de porta ou
// domínio, só precisa trocar aqui, em vez de em cada função.
const API = 'http://localhost:3000'

function App() {
  // Controla qual das 3 telas está visível: 'totem', 'guiche' ou 'painel'.
  const [telaAtual, setTelaAtual] = useState('totem')

  // Estado compartilhado entre as telas, vindo do backend.
  const [senha, setSenha] = useState('')                      // última senha emitida (Totem)
  const [fila, setFila] = useState([])                        // lista de códigos aguardando (Guichê)
  const [ultimaChamada, setUltimaChamada] = useState('')      // senha em atendimento agora
  const [status, setStatus] = useState('')                    // status da senha em atendimento
  const [historicoChamadas, setHistoricoChamadas] = useState([]) // últimas 5 chamadas (Painel)

  // ==========================================
  // FUNÇÕES DE APOIO PARA CHAMAR A API
  // ==========================================

  // GET — usada para carregar dados na tela. Se falhar, só loga no console
  // e não atualiza nada (comportamento igual ao original: falha silenciosa).
  async function buscar(rota) {
    try {
      const resposta = await fetch(`${API}${rota}`)
      const dados = await resposta.json()
      return resposta.ok ? dados : null
    } catch (erro) {
      console.error(erro)
      return null
    }
  }

  // POST — usada pelas ações do atendente/totem. Se a API recusar (erro de
  // regra de negócio) ou a conexão falhar, mostra um alert() pro usuário.
  async function enviar(rota, opcoes = { method: 'POST' }) {
    try {
      const resposta = await fetch(`${API}${rota}`, opcoes)
      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return null
      }

      return dados
    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
      return null
    }
  }

  // ==========================================
  // CARREGAMENTO DE DADOS (GET)
  // ==========================================

  async function carregarFila() {
    const dados = await buscar('/fila')
    if (dados) setFila(dados.fila)
  }

  async function carregarUltimaSenha() {
    const dados = await buscar('/senhas/ultima')
    if (dados?.senha) setSenha(dados.senha)
  }

  async function carregarAtendimentoAtual() {
    const dados = await buscar('/fila/atendimento-atual')
    if (!dados) return

    if (dados.atendimento) {
      setUltimaChamada(dados.atendimento.codigo)
      setStatus(dados.atendimento.status)
    } else {
      setUltimaChamada('')
      setStatus('')
    }
  }

  async function carregarHistorico() {
    const dados = await buscar('/fila/historico')
    if (dados) setHistoricoChamadas(dados.historico)
  }

  async function carregarEstado() {
    await Promise.all([
      carregarFila(),
      carregarUltimaSenha(),
      carregarAtendimentoAtual(),
      carregarHistorico()
    ])
  }

  useEffect(() => {
    carregarEstado()
  }, [])

  // ==========================================
  // AÇÕES (POST)
  // ==========================================

  async function gerarSenha(tipo) {
    const dados = await enviar('/senhas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo })
    })

    if (!dados) return

    setSenha(dados.senha)
    await carregarFila()
  }

  async function chamarProxima() {
    const dados = await enviar('/fila/proxima')
    if (!dados) return

    setUltimaChamada(dados.senha)
    setStatus(dados.status)

    await Promise.all([
      carregarFila(),
      carregarAtendimentoAtual(),
      carregarHistorico()
    ])
  }

  async function rechamar() {
    const dados = await enviar('/fila/rechamar')
    if (!dados) return

    setStatus(dados.status)

    if (dados.status === 'NÃO COMPARECEU') {
      setUltimaChamada('')
    }

    await Promise.all([
      carregarAtendimentoAtual(),
      carregarHistorico()
    ])
  }

  async function iniciarAtendimento() {
    const dados = await enviar('/fila/iniciar')
    if (!dados) return

    setStatus(dados.status)
    await carregarAtendimentoAtual()
  }

  async function finalizarAtendimento() {
    const dados = await enviar('/fila/finalizar')
    if (!dados) return

    setStatus(dados.status)
    setUltimaChamada('')

    await Promise.all([
      carregarAtendimentoAtual(),
      carregarHistorico()
    ])
  }

  // ==========================================
  // TELAS
  // ==========================================

  return (
    <>
      <nav className="navegacao-telas">
        <button onClick={() => setTelaAtual('totem')}>TOTEM</button>
        <button onClick={() => setTelaAtual('guiche')}>GUICHÊ</button>
        <button onClick={() => setTelaAtual('painel')}>PAINEL</button>
      </nav>

      {telaAtual === 'totem' && (
        <Totem gerarSenha={gerarSenha} senha={senha} />
      )}

      {telaAtual === 'guiche' && (
        <Guiche
          fila={fila}
          ultimaChamada={ultimaChamada}
          status={status}
          chamarProxima={chamarProxima}
          rechamar={rechamar}
          iniciarAtendimento={iniciarAtendimento}
          finalizarAtendimento={finalizarAtendimento}
        />
      )}

      {telaAtual === 'painel' && (
        <PainelPublico
          ultimaChamada={ultimaChamada}
          historicoChamadas={historicoChamadas}
        />
      )}
    </>
  )
}

export default App