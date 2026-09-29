# Nassau Tickets

Sistema web acadêmico de controle de atendimento e gerenciamento de filas, desenvolvido para a disciplina de Coding.

## 📌 Sobre o projeto

O **Nassau Tickets** foi desenvolvido com o objetivo de organizar o processo de emissão, gerenciamento e chamada de senhas em um ambiente de atendimento.

O sistema permite que o cliente retire uma senha, aguarde na fila e acompanhe sua chamada por meio de um painel público, enquanto o atendente controla o fluxo de atendimento pelo guichê.

## 🎯 Objetivo

Aplicar na prática conceitos de desenvolvimento de software, utilizando:

* Desenvolvimento Front-end
* Desenvolvimento Back-end
* Banco de dados
* API REST
* Controle de versão
* Componentização
* Documentação de software

## ⚙️ Funcionalidades

* Emissão de senhas.
* Tipos de atendimento SP, SE e SG.
* Gerenciamento da fila de atendimento.
* Chamada da próxima senha.
* Rechamada de senha.
* Início e finalização do atendimento.
* Registro de senhas atendidas.
* Registro de senhas que não compareceram.
* Painel público com as últimas chamadas.
* Numeração independente de senhas por tipo.
* Reinício da numeração a cada dia.

## 🎟️ Tipos de senha

| Código | Tipo               |
| ------ | ------------------ |
| **SP** | Senha Prioritária  |
| **SE** | Retirada de Exames |
| **SG** | Senha Geral        |

A sequência principal de atendimento segue:

```text
SP → SE ou SG → SP → SE ou SG
```

As regras completas de atendimento estão documentadas na pasta `docs/`.

## 🛠️ Tecnologias

### Front-end

* React
* JavaScript
* JSX
* CSS
* Vite

### Back-end

* Node.js
* Express
* API REST
* JSON

### Banco de dados

* MySQL 8.0
* mysql2

### Ferramentas

* Git
* GitHub
* Visual Studio Code

## 🧩 Arquitetura

O sistema utiliza uma arquitetura dividida em três camadas principais:

```text
React
  ↓
API REST
  ↓
Node.js + Express
  ↓
MySQL
```

O Front-end possui três interfaces principais:

```text
Totem
Guichê
Painel Público
```

A documentação técnica e os diagramas do projeto estão disponíveis em `docs/`.

## 📂 Estrutura do projeto

```text
nassauTickets/
├── backend/
├── frontend/
├── docs/
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Como executar

### Pré-requisitos

Instale:

* Node.js
* Git
* MySQL 8.0

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd nassauTickets
```

### 2. Configurar o banco de dados

Crie o banco `nassau_tickets` no MySQL e execute o script de criação disponível na documentação do projeto.

### 3. Configurar o Back-end

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do `.env.example` e configure as credenciais do MySQL.

Depois, execute:

```bash
node server.js
```

O back-end será iniciado na porta `3000`.

### 4. Executar o Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O front-end será disponibilizado pelo Vite, normalmente em:

```text
http://localhost:5173
```

## 🌿 Controle de versão

O projeto utiliza Git e GitHub para controle de versão.

A branch `dev` é utilizada para desenvolvimento e testes. Após a validação das alterações, elas são integradas à branch `main`.

```text
dev → testes → Pull Request → main
```

## 👥 Equipe

| Integrante     | Matrícula | Responsabilidades                                      |
| -------------- | --------- | ------------------------------------------------------ |
| Pedro Pereira  | 01927476  | Desenvolvimento, Back-end, Banco de Dados e Integração |
| Virginia Ratis | 01927477  | Front-end, Interface e Documentação                    |
| Rayana Brasil  | 01889319  | Testes, Documentação e Suporte Front-end               |

## 📚 Documentação

A documentação complementar está organizada na pasta `docs/`, incluindo materiais relacionados a:

* Requisitos;
* Regras de negócio;
* Modelagem de dados;
* UML;
* MER;
* Mockups;
* Identidade visual.

## 📜 Licença

Este projeto está licenciado sob a licença MIT.

Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
