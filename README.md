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

| Código | Tipo |
| ------ | ---- |
| **SP** | Senha Prioritária |
| **SE** | Retirada de Exames |
| **SG** | Senha Geral |

A sequência principal de atendimento segue:

```text
SP → SE ou SG → SP → SE ou SG
```

As regras completas de atendimento estão documentadas na pasta `docs/requirements/`.

## 🛠️ Tecnologias

**Front-end**
- React
- JavaScript
- JSX
- CSS
- Vite

**Back-end**
- Node.js
- Express
- API REST
- JSON

**Banco de dados**
- MySQL 8.0
- mysql2

**Ferramentas**
- Git
- GitHub
- Visual Studio Code

## 🧩 Arquitetura

O sistema é dividido em três partes principais:

```
Frontend React
      ↓
API REST
      ↓
Backend Node.js + Express
      ↓
Banco de Dados MySQL
```

O Front-end possui três interfaces principais:

- Totem
- Guichê
- Painel Público

A documentação técnica e os diagramas do projeto estão disponíveis na pasta `docs/`.

## 📂 Estrutura do projeto

```
nassauTickets/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── database/
│   └── nassau_tickets.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── branding/
│   ├── mer/
│   ├── mockups/
│   ├── models/
│   │   └── uml/
│   └── requirements/
│
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Como executar o projeto

### 📋 Pré-requisitos

Para executar o Nassau Tickets em outra máquina, é necessário instalar:

- Node.js
- Git
- MySQL 8.0
- Visual Studio Code (opcional)

Após instalar os programas, siga os passos abaixo.

### 1. Clonar o repositório

```bash
git clone https://github.com/Pyndio/nassauTickets.git
cd nassauTickets
```

### 2. Configurar o banco de dados

O projeto possui um script SQL pronto para criar a estrutura do banco, localizado em:

```
database/nassau_tickets.sql
```

**Utilizando o MySQL Workbench:**

1. Abra o MySQL Workbench.
2. Conecte-se ao seu servidor MySQL.
3. Abra o arquivo `database/nassau_tickets.sql`.
4. Execute todo o script.

O script irá criar o banco `nassau_tickets` e a tabela `senhas`. Não é necessário criar a tabela manualmente.

### 3. Configurar o Back-end

```bash
cd backend
npm install
```

**Criar o arquivo `.env`**

Dentro da pasta `backend`, existe o arquivo `.env.example`. Crie uma cópia dele e renomeie para `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_MYSQL
DB_NAME=nassau_tickets
PORT=3000
```

Substitua `SUA_SENHA_DO_MYSQL` pela senha utilizada no seu MySQL.

**Iniciar o Back-end**

```bash
node server.js
```

> Se o `package.json` do backend tiver um script `"start": "node server.js"` configurado, `npm start` também funciona. Caso contrário, use `node server.js` diretamente.

Se estiver tudo correto, aparecerá:

```
Servidor rodando em http://localhost:3000
MySQL conectado com sucesso!
```

Não feche esse terminal — o backend precisa continuar executando enquanto o sistema estiver sendo utilizado.

### 4. Executar o Front-end

Abra outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O Vite exibirá um endereço semelhante a `http://localhost:5173`. Abra esse endereço no navegador.

### 5. Executando o sistema

Para o sistema funcionar corretamente, os dois servidores precisam estar ativos:

```bash
# Terminal 1 — Back-end
cd backend
node server.js
```

```bash
# Terminal 2 — Front-end
cd frontend
npm run dev
```

Depois acesse `http://localhost:5173`.

## 🖥️ Interfaces do sistema

### Totem

Utilizado pelo Cliente (AC) para emissão das senhas. O usuário escolhe entre:

- **SP** — Atendimento Prioritário
- **SE** — Retirada de Exames
- **SG** — Atendimento Geral

### Guichê

Utilizado pelo Atendente (AA) para:

- Visualizar a fila;
- Chamar a próxima senha;
- Rechamar;
- Iniciar atendimento;
- Finalizar atendimento.

### Painel Público

Exibe:

- Senha chamada;
- Últimas cinco senhas chamadas.

## 🗄️ Banco de dados

O sistema utiliza o banco `nassau_tickets`, com a tabela `senhas`.

A tabela armazena:

| Campo | Descrição |
| --- | --- |
| `id` | Identificador da senha |
| `codigo` | Código da senha, como `SP001` |
| `tipo` | SP, SE ou SG |
| `status` | Estado atual da senha |
| `numero_chamadas` | Quantidade de chamadas realizadas |
| `data_criacao` | Data e hora de emissão |
| `data_ultima_chamada` | Data e hora da última chamada |

O script para criação do banco está disponível em `database/nassau_tickets.sql`.

## 🔐 Configuração e segurança

As informações de acesso ao banco ficam no arquivo `backend/.env`. Esse arquivo **não deve ser enviado para o GitHub**, pois contém informações privadas.

Por isso, o projeto disponibiliza `backend/.env.example`, que serve apenas como modelo de configuração, sem valores reais.

## 🌿 Controle de versão

O projeto utiliza Git e GitHub para controle de versão. A branch `dev` é utilizada para desenvolvimento e testes. Após a validação das alterações, a versão final é integrada à branch `main`.

```
dev
 ↓
desenvolvimento
 ↓
testes
 ↓
main
```

## Membros

| Nome | Matrícula | Papel |
| --- | --- | --- |
| Pedro Pereira | 01927476 | Scrum Master / Desenvolvedor (Back-end, Banco de Dados e Integração) |
| Virginia Ratis | 01927477 | Desenvolvedora (Front-end) / Documentadora |
| Rayana Brasil | 01889319 | Testadora / Documentadora |

## 📚 Documentação

A documentação complementar está organizada na pasta `docs/`, incluindo materiais relacionados a:

- Requisitos;
- Regras de negócio;
- Modelagem de dados (MER);
- Diagramas UML;
- Mockups;
- Identidade visual (branding).

## 🧪 Testes

O fluxo principal do sistema foi testado com:

- Geração de senhas;
- Entrada na fila;
- Chamada de senha;
- Rechamada;
- Registro de não comparecimento;
- Início do atendimento;
- Finalização do atendimento;
- Atualização do painel;
- Histórico de chamadas;
- Persistência dos dados no MySQL;
- Numeração independente por tipo;
- Reinício da numeração diariamente.

## ❗ Solução de problemas

**O backend não conecta ao MySQL**

Verifique:
- Se o MySQL está em execução.
- Se o banco `nassau_tickets` foi criado.
- Se o arquivo `backend/.env` existe.
- Se usuário, senha e nome do banco estão corretos.

**O frontend não consegue acessar o backend**

Verifique se o backend está rodando em `http://localhost:3000` e se o terminal do backend continua aberto.

**`npm` não é reconhecido**

Isso normalmente significa que o Node.js não está instalado corretamente ou não foi adicionado ao PATH do sistema. Instale o Node.js e abra um novo terminal.

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
