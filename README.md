# Nassau Tickets

## 📄 Descrição

O **Nassau Tickets** é um sistema acadêmico de controle e gerenciamento de atendimento desenvolvido como projeto da disciplina de Coding. O sistema organiza a emissão, fila, chamada e atendimento de senhas, além de disponibilizar um painel público para acompanhamento das chamadas em tempo real.

## 🎯 Objetivo do Projeto

Desenvolver e consolidar uma aplicação web completa para gerenciamento de filas e atendimentos, aplicando conceitos de desenvolvimento front-end (React), back-end (Node.js/Express), banco de dados (MySQL), comunicação assíncrona via API REST/JSON, controle de versão (Git/GitHub) e documentação de requisitos.

## 🛠️ Tecnologias Utilizadas

**Front-end**
- React 19
- JavaScript (ES6+)
- JSX / CSS3
- Vite

**Back-end**
- Node.js LTS 22
- Express

**Banco de Dados**
- MySQL 8.0

**Ferramentas**
- Git & GitHub
- Visual Studio Code

> A escolha do back-end em Node.js/Express se justifica pela familiaridade do grupo com JavaScript, já utilizado no front-end, mantendo a mesma linguagem em toda a stack do projeto.

## 🧩 Arquitetura e Visão Geral

O sistema trabalha com três agentes principais:

- **AS — Agente Sistema:** processa as regras de negócio, comunica-se com o banco de dados, emite senhas e atualiza o painel público automaticamente.
- **AA — Agente Atendente:** chama, rechama, inicia e finaliza o atendimento ao cliente em seu guichê.
- **AC — Agente Cliente:** interage anonimamente com o totem para emitir sua senha e acompanha a chamada pelo painel.

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  TOTEM   │      │  PAINEL  │      │  GUICHÊ   │
│  (AC)    │      │ (público)│      │  (AA)     │
└────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                 │
     └────────┬────────┴────────┬────────┘
              │                 │
         ┌────▼─────────────────▼────┐
         │      FRONTEND (React)      │
         └────┬────────────────────┬──┘
              │   API REST (JSON)  │
         ┌────▼────────────────────▼──┐
         │   BACKEND (Node/Express)    │
         └────┬─────────────────────┬──┘
              │                     │
         ┌────▼─────────────────────▼──┐
         │       BANCO DE DADOS         │
         │          MySQL 8.0           │
         └───────────────────────────────┘
```

**Telas do sistema**
- 🖥️ **Totem** — cliente escolhe o tipo de atendimento (SP, SE ou SG) e recebe sua senha.
- 🧑‍💼 **Guichê** — atendente chama, rechama, inicia e finaliza o atendimento.
- 📺 **Painel Público** — exibe as 5 últimas senhas chamadas, com identificação visual por tipo.

## 🎟️ Tipos de Senha e Numeração

| Tipo | Descrição                     |
|------|--------------------------------|
| SP   | Senha Prioritária 🟡           |
| SE   | Senha para Retirada de Exames 🔴 |
| SG   | Senha Geral 🔵                 |


## ⚖️ Regras de Atendimento

```
SP → SE ou SG → SP → SE ou SG
```

- **SP** tem a maior prioridade.
- **SE** é chamada sempre após uma SP, quando disponível.
- **SG** tem a menor prioridade.
- Qualquer guichê atende qualquer tipo de senha.
- Se uma fila estiver vazia, o sistema segue para o próximo tipo disponível.
- Senha chamada duas vezes sem comparecimento → **NÃO_COMPARECEU**.

## 🔄 Máquina de Estados

```
EMITIDA → AGUARDANDO → CHAMADA → CHAMADA_NOVAMENTE → EM_ATENDIMENTO → ATENDIDA
```

Também é possível o estado **NÃO_COMPARECEU**, quando o cliente falta às duas chamadas previstas.

## 📂 Estrutura do Repositório

```
nassauTickets/
├── backend/
├── docs/
│   ├── branding/
│   ├── mer/
│   ├── mockups/
│   ├── models/
│   │   └── uml/
│   └── requirements/
├── frontend/
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js LTS 22](https://nodejs.org/)
- [Git](https://git-scm.com/)
- MySQL 8.0 *(necessário a partir da integração com o back-end)*

### Clonando o repositório

```bash
git clone https://github.com/[usuario]/nassauTickets.git
cd nassauTickets
```

### Front-end

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Back-end

```bash
cd backend
npm install
npm run dev
```

> *(Instruções serão atualizadas conforme a API for concluída.)*

## ⚙️ Configuração

> *(Esta seção será atualizada com as variáveis de ambiente — como a string de conexão do MySQL — assim que o back-end for integrado.)*


## Membros

| Nome | Matrícula|                  Papel|
|:--|:--|--|
| Pedro Pereira | 01927476  | Scrum Master / Desenvolvedor (Back-end e Banco de Dados) |
| Virginia Ratis | 01927477 | Desenvolvedora (Front-end) / Documentadora |
| Rayana Brasil | 01889319 | Testadora / Documentadora |

**Responsabilidades**

- 🧑‍💻 **Scrum Master / Desenvolvedor (Back-end e Banco de Dados):** criação e organização do repositório, coordenação do grupo, API REST em Node.js/Express e modelagem/implementação do banco MySQL.
- 🎨 **Desenvolvedora (Front-end) / Documentadora:** telas em React (Totem, Guichê, Painel) e parte da documentação (mockups, identidade visual).
- 🔍 **Testadora / Documentadora:** verificação do funcionamento, identificação de problemas, documentação de requisitos, MER e diagramas UML.

## 📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
