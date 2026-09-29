# UI/UX — Especificação consolidada

## Princípio visual
A operação deve parecer uma **central profissional de despacho**, não um menu genérico de RPG. O modo narrativo pode assumir linguagem de visual novel/webnovel, criando contraste intencional entre pressão operacional e intimidade pós-expediente.

## Fluxo macro web
`/` abertura → `/login` → `/novo-jogo` (nome do Analista) → `/agencia` → despacho → `/relatorio` → `/conversa` → consequência/save → próximo dia.

## Central de operações — visão-alvo
- **Centro:** mapa da cidade, ocorrências pulsando, distritos e rotas.
- **Esquerda:** fila de ocorrências: prioridade, cronômetro, confiabilidade, civis confirmados.
- **Direita:** cartões dos heróis: retrato, disponibilidade, fadiga, ferimento, estresse, localização/canal.
- **Inferior:** composição de equipe de 1–3; mostrar adequação e alertas de Ressonância sem revelar uma “resposta correta”.
- **Superior:** reputação, estado global da cidade, recursos da agência e hora/turno.
- **Comunicações:** feed curto com atualizações e mudança de situação.

## Hierarquia de informação
1. O que exige ação agora.
2. Quanto tempo existe e quão confiável é a informação.
3. Quem está realmente disponível e em qual condição.
4. O que a equipe selecionada cobre e quais riscos cria.
5. Consequências e explicação depois da decisão.

## Cartão de herói
Deve comunicar pessoa + capacidade: nome, poder/função, estado, fadiga/estresse/ferimento, tags relevantes, localização e sinais relacionais/contextuais quando pertinentes. Evitar transformar relações íntimas em números expostos sem necessidade; valores podem operar nos bastidores e aparecer como linguagem humana/estados.

## Feedback de seleção
Ao montar equipe, indicar cobertura de necessidades, conflitos de condição e sinergias conhecidas. Não exibir “92% melhor escolha” como solução absoluta. Falha deve ser explicável no relatório.

## Relatório pós-missão
Tela dedicada entre despacho e conversa. Deve explicar: resultado; objetivos cumpridos/falhos; fatores positivos; fatores de risco; condição dos heróis; danos/civis; reputação; mudanças relacionais; flags narrativas geradas. O relatório é ponte para a cena seguinte.

## Modo conversa / VN
Cena focada em personagem, nome do Analista interpolado no diálogo, escolhas legíveis e consequências nem sempre numericamente explícitas. Contexto da missão deve alterar fala/ramificações. A UI deve permitir retrato/arte futura, nome do falante, texto, escolhas e indicadores discretos de estado.

## Responsividade e acessibilidade
Web-first. Priorizar leitura em desktop, mas permitir layout responsivo. Não depender apenas de cor para prioridade/estado; contraste suficiente; foco de teclado; alvos clicáveis confortáveis; texto escalável; redução de movimento futura; cronômetros nunca devem ser o único meio de comunicar urgência.

## Estado do protótipo 0.1.x
A UI atual já possui abertura, login mock, criação do Analista, central simplificada, seleção de até 3 heróis e cena de Yuki. O mapa completo, `/relatorio`, cronômetros reais e UI final ainda não estão implementados.
