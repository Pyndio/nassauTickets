# Mockups — Nassau Tickets

## 1. Sobre este documento

Este arquivo apresenta os wireframes funcionais das três telas do sistema, refletindo exatamente os componentes e ações implementados em `frontend/src/App.jsx` e nas páginas `Totem`, `Guiche` e `PainelPublico`.

> Imagens de alta fidelidade (protótipo visual) podem ser adicionadas nesta pasta futuramente. Este documento serve como referência funcional de cada tela enquanto isso.

## 2. Tela Totem

Usada pelo Cliente (AC) para emitir a senha.

```
┌───────────────────────────────────────┐
│              NASSAU TICKETS            │
│                                         │
│         Escolha seu atendimento        │
│                                         │
│   [ SP - Prioritária ]                 │
│   [ SE - Retirada de exames ]          │
│   [ SG - Geral ]                       │
│                                         │
│   Senha gerada: SP003                  │
└───────────────────────────────────────┘
```

**Ações disponíveis:** escolher o tipo de senha (`gerarSenha(tipo)`), que dispara `POST /senhas` e exibe o código gerado na tela.

## 3. Tela Guichê

Usada pelo Atendente (AA) para controlar a fila e o atendimento.

```
┌───────────────────────────────────────┐
│                 GUICHÊ                 │
│                                         │
│  Fila de atendimento:                  │
│  SP002 - SE001 - SG003 - SG004         │
│                                         │
│  Senha em atendimento: SP001           │
│  Status: CHAMADA                       │
│                                         │
│  [ Chamar próxima ]                    │
│  [ Rechamar ]                          │
│  [ Iniciar atendimento ]               │
│  [ Finalizar atendimento ]             │
└───────────────────────────────────────┘
```

**Ações disponíveis:** `chamarProxima`, `rechamar`, `iniciarAtendimento`, `finalizarAtendimento` — cada uma chama sua respectiva rota (`POST /fila/...`) e atualiza a fila, o status e o histórico na tela.

**Regra visual importante:** os botões ficam habilitados/desabilitados de acordo com o `status` atual da senha (ex: "Chamar próxima" fica bloqueado enquanto já existir uma senha em atendimento), evitando ações fora de ordem.

## 4. Tela Painel Público

Usada pelo Cliente (AC) para acompanhar as chamadas, sem interação — somente leitura.

```
┌───────────────────────────────────────┐
│              PAINEL PÚBLICO            │
│                                         │
│           SENHA CHAMADA                │
│              SP001                     │
│                                         │
│         Últimas chamadas:              │
│         🟡 SP001                       │
│         🔴 SE003                       │
│         🔵 SG002                       │
│         🟡 SP002                       │
│         🔵 SG001                       │
└───────────────────────────────────────┘
```

**Dados exibidos:** `ultimaChamada` (a senha em atendimento no momento) e `historicoChamadas` (as últimas 5 senhas chamadas), ambos vindos do backend via `GET /fila/atendimento-atual` e `GET /fila/historico`.

**Regra importante (RN07):** o painel nunca exibe a *próxima* senha a ser chamada — apenas a que já foi chamada — porque uma nova senha pode ser emitida entre a finalização de um atendimento e o próximo acionamento do atendente.

## 5. Navegação entre telas

```
┌─────────────────────────────┐
│  [ TOTEM ]  [ GUICHÊ ]  [ PAINEL ] │
└─────────────────────────────┘
```

As três telas convivem no mesmo app React, alternadas por um menu simples no topo (`telaAtual`), sem necessidade de rotas separadas nesta fase do projeto.
