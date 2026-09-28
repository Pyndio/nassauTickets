function Guiche({
  fila,
  ultimaChamada,
  status,
  chamarProxima,
  rechamar,
  iniciarAtendimento,
  finalizarAtendimento
}) {

  return (
    <main className="guiche">

      <header className="topo-guiche">

        <div>
          <strong>Nassau Tickets</strong>
          <span>Atendimento</span>
        </div>

        <div className="identificacao-guiche">
          GUICHÊ 01
        </div>

      </header>

      <section className="fila-guiche">

        <h2>Fila aguardando atendimento</h2>

        <div>

          {fila.length === 0 ? (

            <p>
              Nenhuma senha aguardando.
            </p>

          ) : (

            fila.map((senha, index) => (

              <span
                key={index}
                className="senha-fila-guiche"
              >
                {senha}
              </span>

            ))

          )}

        </div>

      </section>

      <section className="atendimento-guiche">

        <h1>
          Atendimento
        </h1>

        <div className="senha-atual-guiche">

          <span>
            Senha atual
          </span>

          <strong>
            {ultimaChamada || '---'}
          </strong>

          <small>
            {status || 'Nenhuma senha chamada'}
          </small>

        </div>

        <button
          className="botao-chamar"
          onClick={chamarProxima}
          disabled={
            fila.length === 0 ||
            status === 'CHAMADA' ||
            status === 'CHAMADA NOVAMENTE' ||
            status === 'EM ATENDIMENTO'
          }
        >
          CHAMAR PRÓXIMA
        </button>

        {ultimaChamada &&
          (
            status === 'CHAMADA' ||
            status === 'CHAMADA NOVAMENTE'
          ) && (

            <div className="acoes-atendimento">

              <button onClick={rechamar}>
                RECHAMAR
              </button>

              <button onClick={iniciarAtendimento}>
                INICIAR ATENDIMENTO
              </button>

            </div>

          )}

        {ultimaChamada &&
          status === 'EM ATENDIMENTO' && (

            <button
              className="botao-finalizar"
              onClick={finalizarAtendimento}
            >
              FINALIZAR ATENDIMENTO
            </button>

          )}

      </section>

    </main>
  )
}

export default Guiche