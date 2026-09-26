function GerarSenha({ gerarSenha }) {
  return (
    <section className="opcoes-atendimento">

      <h2>Escolha o tipo de atendimento</h2>

      <div className="grade-opcoes">

        {/* ATENDIMENTO GERAL */}
        <button
          className="opcao atendimento-geral"
          onClick={() => gerarSenha('SG')}
        >
          <span className="opcao-conteudo">
            <strong>ATENDIMENTO GERAL</strong>

            <small>
              Atendimento padrão para consultas, cadastros e orientação.
            </small>

            <span className="codigo">
              SG — Senha Geral
            </span>
          </span>
        </button>

        {/* ATENDIMENTO PREFERENCIAL */}
        <button
          className="opcao atendimento-preferencial"
          onClick={() => gerarSenha('SP')}
        >
          <span className="opcao-conteudo">
            <strong>ATENDIMENTO PREFERENCIAL</strong>

            <small>
              Idosos, gestantes, PcD, autistas e prioridades legais.
            </small>

            <span className="codigo">
              SP — Senha Preferencial
            </span>
          </span>
        </button>

        {/* RETIRADA DE EXAMES */}
        <button
          className="opcao retirada-exames"
          onClick={() => gerarSenha('SE')}
        >
          <span className="opcao-conteudo">
            <strong>RETIRADA DE EXAMES</strong>

            <small>
              Entrega de laudos, resultados de exames e relatórios.
            </small>

            <span className="codigo">
              SE — Retirada de Exames
            </span>
          </span>
        </button>

      </div>

    </section>
  )
}

export default GerarSenha