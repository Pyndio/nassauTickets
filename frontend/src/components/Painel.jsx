function Painel({ historicoChamadas }) {
  return (
    <section className="area-sistema painel-area">

      <h2>Últimas senhas</h2>

      <div className="senhas-painel">
        {historicoChamadas.map((senhaChamada, index) => {

          let classe = 'senha-painel'

          if (senhaChamada.startsWith('SP')) {
            classe += ' senha-sp'
          }

          if (senhaChamada.startsWith('SG')) {
            classe += ' senha-sg'
          }

          if (senhaChamada.startsWith('SE')) {
            classe += ' senha-se'
          }

          if (index === 0) {
            classe += ' senha-atual'
          }

          return (
            <span
              className={classe}
              key={index}
            >
              {senhaChamada}
            </span>
          )
        })}
      </div>

    </section>
  )
}

export default Painel