## 🧩 Funcionamento

O Nassau Tickets é dividido em três partes:

- **Front-end:** interface do sistema desenvolvida em React.
- **Back-end:** API REST desenvolvida em Node.js e Express.
- **Banco de dados:** MySQL 8.0, responsável pelo armazenamento das senhas e atendimentos.

O sistema possui três telas principais:

- **Totem:** emissão de senhas SP, SE ou SG.
- **Guichê:** chamada, rechamada, início e finalização dos atendimentos.
- **Painel Público:** exibição da senha chamada e das últimas chamadas.

### Tipos de senha

| Tipo | Descrição |
|---|---|
| SP | Senha Prioritária |
| SE | Senha para Retirada de Exames |
| SG | Senha Geral |

### Regra principal de atendimento
SP → SE ou SG → SP → SE ou SG

## Membros

| Nome | Matrícula|                  Papel|
|:--|:--|--|
| Pedro Pereira | 01927476  | Scrum Master / Desenvolvedor (Back-end e Banco de Dados) |
| Virginia Ratis | 01927477 | Desenvolvedora (Front-end) / Documentadora |
| Rayana Brasil | 01889319 | Testadora / Documentadora / Suporte(frontend) |

**Responsabilidades**

- 🧑‍💻 **Scrum Master / Desenvolvedor (Back-end e Banco de Dados):** criação e organização do repositório, coordenação do grupo, API REST em Node.js/Express e modelagem/implementação do banco MySQL.
- 🎨 **Desenvolvedora (Front-end) / Documentadora:** telas em React (Totem, Guichê, Painel) e parte da documentação (mockups, identidade visual).
- 🔍 **Testadora / Documentadora:** verificação do funcionamento, identificação de problemas, documentação de requisitos, MER e diagramas UML.

## 📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
