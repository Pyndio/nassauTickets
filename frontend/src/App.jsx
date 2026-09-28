import { useEffect, useState } from 'react'
import Totem from './pages/Totem'
import Guiche from './pages/Guiche'
import PainelPublico from './pages/PainelPublico'

function App() {
  const [telaAtual, setTelaAtual] = useState('totem')

  const [senha, setSenha] = useState('')
  const [fila, setFila] = useState([])
  const [ultimaChamada, setUltimaChamada] = useState('')
  const [status, setStatus] = useState('')
  const [historicoChamadas, setHistoricoChamadas] = useState([])

  async function gerarSenha(tipo) {
    try {
      const resposta = await fetch('http://localhost:3000/senhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipo: tipo
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return
      }

      setSenha(dados.senha)

      carregarFila()
    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  async function carregarFila() {
    try {
      const resposta = await fetch('http://localhost:3000/fila')
      const dados = await resposta.json()

      setFila(dados.fila)
    } catch (erro) {
      console.error(erro)
    }
  }

  useEffect(() => {
    carregarFila()
  }, [])

  async function chamarProxima() {
    try {
      const resposta = await fetch(
        'http://localhost:3000/fila/proxima',
        {
          method: 'POST'
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return
      }

      setFila((filaAnterior) =>
        filaAnterior.filter(
          (senha) => senha !== dados.senha
        )
      )

      setUltimaChamada(dados.senha)
      setStatus(dados.status)

      setHistoricoChamadas(
        (historicoAnterior) => [
          dados.senha,
          ...historicoAnterior
        ].slice(0, 5)
      )

    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  async function rechamar() {
    try {
      const resposta = await fetch(
        'http://localhost:3000/fila/rechamar',
        {
          method: 'POST'
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return
      }

      setStatus(dados.status)

      if (dados.status === 'NÃO_COMPARECEU') {
        setUltimaChamada('')
      }

    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  async function iniciarAtendimento() {
    try {
      const resposta = await fetch(
        'http://localhost:3000/fila/iniciar',
        {
          method: 'POST'
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return
      }

      setStatus(dados.status)

    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  async function finalizarAtendimento() {
    try {
      const resposta = await fetch(
        'http://localhost:3000/fila/finalizar',
        {
          method: 'POST'
        }
      )

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.erro)
        return
      }

      setStatus(dados.status)

    } catch (erro) {
      console.error(erro)
      alert('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <>
      <nav className="navegacao-telas">

        <button
          onClick={() => setTelaAtual('totem')}
        >
          TOTEM
        </button>

        <button
          onClick={() => setTelaAtual('guiche')}
        >
          GUICHÊ
        </button>

        <button
          onClick={() => setTelaAtual('painel')}
        >
          PAINEL
        </button>

      </nav>

      {telaAtual === 'totem' && (
        <Totem
          gerarSenha={gerarSenha}
          senha={senha}
        />
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