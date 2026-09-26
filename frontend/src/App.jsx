import { useState } from 'react'
import Totem from './pages/Totem'
import Guiche from './pages/Guiche'
import PainelPublico from './pages/PainelPublico'

function App() {
  const [telaAtual, setTelaAtual] = useState('totem')

  const [senha, setSenha] = useState('')
  const [contadorSP, setContadorSP] = useState(0)
  const [contadorSE, setContadorSE] = useState(0)
  const [contadorSG, setContadorSG] = useState(0)

  const [fila, setFila] = useState([])
  const [ultimaChamada, setUltimaChamada] = useState('')
  const [status, setStatus] = useState('')
  const [quantidadeChamadas, setQuantidadeChamadas] = useState(0)
  const [historicoChamadas, setHistoricoChamadas] = useState([])

  function gerarSenha(tipo) {
    let numero
    let novaSenha

    if (tipo === 'SP') {
      numero = contadorSP + 1
      setContadorSP(numero)
      novaSenha = `SP${String(numero).padStart(3, '0')}`
    }

    if (tipo === 'SE') {
      numero = contadorSE + 1
      setContadorSE(numero)
      novaSenha = `SE${String(numero).padStart(3, '0')}`
    }

    if (tipo === 'SG') {
      numero = contadorSG + 1
      setContadorSG(numero)
      novaSenha = `SG${String(numero).padStart(3, '0')}`
    }

    setSenha(novaSenha)

    setFila((filaAnterior) => [
      ...filaAnterior,
      novaSenha
    ])
  }

  function chamarProxima() {
    if (fila.length === 0) {
      return
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

    // Chamadas pares: SP
    if (quantidadeChamadas % 2 === 0) {
      if (filaSP) {
        senhaParaChamar = filaSP
      }
    }

    // Chamadas ímpares: SE ou SG
    if (quantidadeChamadas % 2 !== 0) {
      if (filaSE) {
        senhaParaChamar = filaSE
      } else if (filaSG) {
        senhaParaChamar = filaSG
      }
    }

    // Caso não exista senha do tipo esperado,
    // chama a primeira senha disponível.
    if (!senhaParaChamar) {
      senhaParaChamar = fila[0]
    }

    setFila((filaAnterior) =>
      filaAnterior.filter(
        (senha) => senha !== senhaParaChamar
      )
    )

    setUltimaChamada(senhaParaChamar)

    setStatus('CHAMADA')

    setQuantidadeChamadas(
      (quantidadeAnterior) =>
        quantidadeAnterior + 1
    )

    setHistoricoChamadas(
      (historicoAnterior) => [
        senhaParaChamar,
        ...historicoAnterior
      ].slice(0, 5)
    )
  }

  function rechamar() {
    if (status === 'CHAMADA') {
      setStatus('CHAMADA_NOVAMENTE')
      return
    }

    if (status === 'CHAMADA_NOVAMENTE') {
      setStatus('NÃO_COMPARECEU')
      setUltimaChamada('')
    }
  }

  function iniciarAtendimento() {
    setStatus('EM_ATENDIMENTO')
  }

  function finalizarAtendimento() {
    setStatus('ATENDIDA')
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