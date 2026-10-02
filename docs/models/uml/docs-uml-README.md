# Diagramas UML — Nassau Tickets

## 1. Diagrama de Estados da Senha

Reflete exatamente a máquina de estados implementada nas rotas `/fila/proxima`, `/fila/rechamar`, `/fila/iniciar` e `/fila/finalizar` do backend.

```mermaid
stateDiagram-v2
    [*] --> AGUARDANDO

    state "CHAMADA NOVAMENTE" as CHAMADA_NOVAMENTE
    state "EM ATENDIMENTO" as EM_ATENDIMENTO
    state "NÃO COMPARECEU" as NAO_COMPARECEU

    AGUARDANDO --> CHAMADA : atendente aciona "Chamar próxima"
    CHAMADA --> CHAMADA_NOVAMENTE : atendente aciona "Rechamar"
    CHAMADA --> EM_ATENDIMENTO : atendente aciona "Iniciar atendimento"
    CHAMADA_NOVAMENTE --> EM_ATENDIMENTO : atendente aciona "Iniciar atendimento"
    CHAMADA_NOVAMENTE --> NAO_COMPARECEU : atendente aciona "Rechamar" novamente
    EM_ATENDIMENTO --> ATENDIDA : atendente aciona "Finalizar atendimento"

    ATENDIDA --> [*]
    NAO_COMPARECEU --> [*]
```

**Regras aplicadas em cada transição** (RN04, RN05 e RN06 do documento de requisitos):

- Uma senha só pode ser rechamada se estiver em `CHAMADA` ou `CHAMADA NOVAMENTE`.
- Uma senha só pode iniciar atendimento se estiver em `CHAMADA` ou `CHAMADA NOVAMENTE`.
- Uma senha só pode ser finalizada se estiver em `EM ATENDIMENTO`.
- Após a segunda chamada sem resposta, a senha vai direto para `NÃO COMPARECEU` e sai do fluxo.

## 2. Diagrama de Sequência — Emissão e Chamada de Senha

Mostra a interação entre os três agentes do sistema (AC, AA, AS) e os componentes técnicos.

```mermaid
sequenceDiagram
    actor AC as Cliente (AC)
    participant Totem
    participant API as Backend / API REST
    participant DB as MySQL

    actor AA as Atendente (AA)
    participant Guiche as Guichê
    participant Painel as Painel Público

    AC->>Totem: Escolhe tipo de atendimento (SP/SE/SG)
    Totem->>API: POST /senhas { tipo }
    API->>DB: INSERT INTO senhas (status = AGUARDANDO)
    DB-->>API: senha criada
    API-->>Totem: código da senha (ex: SP003)

    AA->>Guiche: Clica em "Chamar próxima"
    Guiche->>API: POST /fila/proxima
    API->>DB: SELECT fila (AGUARDANDO) + regra de prioridade
    API->>DB: UPDATE status = CHAMADA
    DB-->>API: senha chamada
    API-->>Guiche: código + status CHAMADA

    Painel->>API: GET /fila/historico (a cada atualização)
    API->>DB: SELECT últimas 5 chamadas
    DB-->>API: histórico
    API-->>Painel: lista de senhas chamadas
```

## 3. Diagrama de Componentes — Arquitetura do Sistema

```mermaid
flowchart LR
    subgraph Frontend [Frontend React]
        Totem
        Guiche[Guichê]
        Painel[Painel Público]
    end

    subgraph Backend [Backend Node.js + Express]
        API[API REST]
    end

    DB[(MySQL 8.0)]

    Totem -->|fetch| API
    Guiche -->|fetch| API
    Painel -->|fetch| API
    API --> DB
```

Cada uma das três telas do frontend se comunica com o backend de forma independente, via `fetch`, consumindo os mesmos endpoints REST descritos no README principal do projeto.

## 4. Legenda dos agentes (conforme especificação do sistema)

| Sigla | Agente | Papel |
|---|---|---|
| AS | Agente Sistema | O backend (Node.js + Express) e o banco de dados (MySQL) — processa regras, persiste dados e responde às requisições. |
| AA | Agente Atendente | Pessoa que opera a tela do Guichê: chama, rechama, inicia e finaliza atendimentos. |
| AC | Agente Cliente | Pessoa que interage com o Totem para emitir sua senha e acompanha o Painel Público. |
