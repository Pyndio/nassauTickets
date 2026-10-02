# Identidade Visual (Branding) — Nassau Tickets

## 1. Sobre o projeto
O Nassau Tickets é o sistema de controle de atendimento desenvolvido para a disciplina de Coding, em parceria visual com a identidade da UNINASSAU, instituição de origem do projeto acadêmico.

Este documento registra as decisões visuais já adotadas no sistema. Arquivos de logo em alta resolução, variações de marca e guia de estilo completo podem ser adicionados nesta pasta conforme forem produzidos.

## 2. Nome e propósito da marca
- **Nome do sistema:** Nassau Tickets
- **Subtítulo na interface:** Sistema de controle de atendimento
- **Proposta:** transmitir organização e agilidade no atendimento, remetendo a sistemas de senha de laboratórios e serviços de atendimento ao público.

## 3. Estilo visual
A interface segue um estilo moderno e tecnológico, com tema escuro e efeito *glassmorphism*:

- Fundo em degradê escuro (`#070b17` → `#0a1020` → `#0e1730`), com brilhos suaves em azul (canto superior esquerdo) e amarelo (canto inferior direito).
- Cards translúcidos com desfoque de fundo (*blur*), bordas finas claras e cantos bastante arredondados.
- Luzes decorativas suaves: um brilho azulado atrás da logo da UNINASSAU e um brilho amarelo discreto no canto inferior direito do totem.
- Animação de entrada nas telas (aparece com leve subida, em 0,5 s) e efeito de elevação nos cards e botões ao passar o mouse.
- Layout responsivo, com ajustes para telas de até 750 px (celular).

## 4. Paleta de cores — Identificação por tipo de senha
O Painel Público e a tela do totem usam cores para diferenciar rapidamente o tipo de cada senha, facilitando a leitura à distância. Cada tipo usa um degradê:

| Tipo | Cor | Degradê (código) | Texto | Cor da senha em destaque no painel |
|------|-----|------------------|-------|------------------------------------|
| SP — Preferencial | Amarelo | `#ffd43d` → `#ffea79` | `#17223e` (azul escuro) | `#ffd84d` |
| SE — Retirada de Exames | Vermelho | `#dc3155` → `#ff607a` | Branco | `#ff6680` |
| SG — Geral | Azul | `#1c5fe0` → `#347df5` | Branco | `#6ea8ff` |

## 5. Cores base da interface

| Uso | Cor | Código |
|-----|-----|--------|
| Azul principal | Azul | `#4f8cff` |
| Azul de destaque (títulos, senha atual) | Azul claro | `#6ea8ff` |
| Azul escuro de apoio | Azul escuro | `#101a35` |
| Destaque (senha gerada, guichê) | Amarelo | `#ffd84d` |
| Alerta / retirada de exames | Vermelho | `#ff5573` |
| Fundo da página | Azul quase preto | `#080d1c` / `#0d1428` |
| Texto principal | Branco azulado | `#edf3ff` |
| Texto secundário | Cinza azulado | `#9aa9c7` |
| Títulos | Branco | `#ffffff` |
| Status "Sistema online" | Verde claro | `#71e89c` (bolinha `#55df87`) |
| Botão "Finalizar" | Verde | `#1d9b62` → `#2ccf80` |

## 6. Tipografia
- **Fonte:** Inter, com alternativas `"Segoe UI"`, Arial e sans-serif.
- **Pesos:** textos de apoio em peso regular; títulos, botões e senhas em peso bold/extra bold (700 e 800).
- **Título de boas-vindas:** tamanho responsivo (de 32 px a 48 px), com degradê de texto do branco ao azul claro.
- **Senha chamada no Painel Público:** tamanho responsivo (de 75 px a 130 px), para leitura à distância.

## 7. Logotipo
O logotipo da UNINASSAU aparece no topo da tela inicial (totem), à esquerda, com 145 px de largura. Ao lado dele ficam o nome "Nassau Tickets" e o subtítulo "Sistema de controle de atendimento", separados por uma linha fina em tom dourado. Uma luz suave azulada atrás da logo ajuda a destacá-la no fundo escuro.

Pendente: adicionar aqui os arquivos de logo em formato .svg/.png utilizados no frontend, para referência da equipe.

## 8. Telas do sistema
- **Totem:** tela inicial com boas-vindas, exibição da senha gerada e escolha do tipo de atendimento (Geral, Preferencial ou Retirada de Exames), com botão de Acessibilidade no rodapé.
- **Guichê:** fila de senhas, senha atual em atendimento, botão para chamar e ações de atendimento e finalização.
- **Painel Público:** chamada atual em destaque, com o guichê responsável, e histórico das últimas senhas chamadas, coloridas por tipo.

## 9. Responsável
A definição e manutenção da identidade visual é de responsabilidade da equipe de front-end/documentação do grupo, conforme divisão de papéis descrita no README.md principal.
