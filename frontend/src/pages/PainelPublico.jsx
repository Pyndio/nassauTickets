function PainelPublico({
  ultimaChamada,
  historicoChamadas
}) {

  function classeDaSenha(senha) {
    if (senha.startsWith('SP')) {
      return 'senha-preferencial'
    }

    if (senha.startsWith('SE')) {
      return 'senha-exames'
    }

    return 'senha-geral'
  }

  return (
    <main className="painel-publico">

      <header className="topo-painel">

        <div>
          <strong>Nassau Tickets</strong>
          <span>Painel de Atendimento</span>
        </div>

        <div className="status-painel">
          SISTEMA ONLINE
        </div>

      </header>

      <section className="chamada-atual">

        <span>Senha chamada</span>

        <strong
          className={
            ultimaChamada
              ? classeDaSenha(ultimaChamada)
              : ''
          }
        >
          {ultimaChamada || '---'}
        </strong>

        {ultimaChamada && (
          <div className="guiche-chamada">
            GUICHÊ 01
          </div>
        )}

        <p>
          {ultimaChamada
            ? 'Dirija-se ao guichê indicado.'
            : 'Aguardando próxima chamada.'
          }
        </p>

      </section>

      <section className="historico-painel">

        <h2>Últimas senhas chamadas</h2>

        <div className="senhas-painel-publico">

          {historicoChamadas.length === 0 ? (
            <span>Nenhuma senha chamada.</span>
          ) : (
            historicoChamadas.map((senha, index) => (
              <span
                className={`senha-painel-publico ${classeDaSenha(senha)}`}
                key={index}
              >
                {senha}
              </span>
            ))
          )}

        </div>

      </section>

    </main>
  )
}

export default PainelPublico