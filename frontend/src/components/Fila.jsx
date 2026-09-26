function Fila({ fila }) {
  return (
    <section className="area-sistema fila-area">

      <h2>Fila de atendimento</h2>

      <div className="senhas-fila">
        {fila.map((senha, index) => {
          let classe = 'senha-balao'

          if (senha.startsWith('SP')) {
            classe += ' senha-sp'
          }

          if (senha.startsWith('SG')) {
            classe += ' senha-sg'
          }

          if (senha.startsWith('SE')) {
            classe += ' senha-se'
          }

          return (
            <span className={classe} key={index}>
              {senha}
            </span>
          )
        })}
      </div>

    </section>
  )
}

export default Fila