# Nassau Tickets

## Descrição

Sistema acadêmico para controle e gerenciamento de atendimento, desenvolvido para organizar a emissão, o gerenciamento e a chamada de senhas em um ambiente de atendimento.

O sistema possui diferentes tipos de atendimento e permite que usuários retirem suas senhas, atendentes gerenciem a fila e o público acompanhe as chamadas através de um painel.

## Objetivo do Projeto

Desenvolver uma aplicação web para gerenciamento de filas e atendimentos, aplicando conceitos de desenvolvimento de software, organização de código, trabalho em equipe e controle de versões.

## Tecnologias Utilizadas

### Front-end
- React
- JavaScript
- JSX
- CSS
- Vite

### Back-end
- Node.js
- Express

### Banco de Dados
- MySQL 8.0

### Controle de Versão
- Git & GitHub

## Tipos de Atendimento

- **SP — Senha Preferencial**
- **SE — Retirada de Exames**
- **SG — Senha Geral**

## Regras de Atendimento

A ordem de atendimento segue a sequência:

```text
SP → SE ou SG → SP → SE ou SG
