import GerarSenha from '../components/GerarSenha'

function Totem({ gerarSenha, senha }) {
  return (
    <main className="totem">

      <header className="topo">

        <div className="identidade">

          <img
            src="/images/uninassau.svg"
            alt="UNINASSAU"
            className="logo"
          />

          <div className="nome-sistema">

            <strong>
              Nassau Tickets
            </strong>

            <span>
              Sistema de controle de atendimento
            </span>

          </div>

        </div>

        <div className="status-sistema">
          Sistema online
        </div>

      </header>

      <section className="boas-vindas">

        <h1>
          Bem-vindo!
        </h1>

        <p>
          Escolha o tipo de atendimento para retirar sua senha.
        </p>

      </section>

      {senha && (
        <section className="senha-gerada">

          <span>
            Sua senha é:
          </span>

          <strong>
            {senha}
          </strong>

          <small>
            Aguarde ser chamado no painel.
          </small>

        </section>
      )}

      <GerarSenha
        gerarSenha={gerarSenha}
      />

      <footer className="rodape">

        <button>
          Acessibilidade
        </button>

      </footer>

    </main>
  )
}

export default Totem