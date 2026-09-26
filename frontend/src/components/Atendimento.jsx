function Atendimento({
  ultimaChamada,
  status,
  chamarProxima,
  rechamar,
  iniciarAtendimento,
  finalizarAtendimento
}) {
  return (
    <section>
      <h2>Atendimento</h2>

      {ultimaChamada && (
        <h2>Senha chamada: {ultimaChamada}</h2>
      )}

      {status && (
        <p>Status: {status}</p>
      )}

      <button
        className="botao-chamar"
        onClick={chamarProxima}
        disabled={
          status === 'CHAMADA' ||
          status === 'CHAMADA_NOVAMENTE' ||
          status === 'EM_ATENDIMENTO'
        }
      >
        CHAMAR PRÓXIMA
      </button>

      {ultimaChamada &&
        (status === 'CHAMADA' ||
          status === 'CHAMADA_NOVAMENTE') && (
          <>
            <button onClick={rechamar}>
              RECHAMAR
            </button>

            <button onClick={iniciarAtendimento}>
              INICIAR ATENDIMENTO
            </button>
          </>
        )}

      {ultimaChamada && status === 'EM_ATENDIMENTO' && (
        <button onClick={finalizarAtendimento}>
          FINALIZAR ATENDIMENTO
        </button>
      )}
    </section>
  )
}

export default Atendimento