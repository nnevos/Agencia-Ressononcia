## Beta 1 · v0.3.0-beta.14

Rework total do Dispatch mobile: no celular a Central agora usa um fluxo sequencial próprio — **Central → Chamado → Equipe → Resultado/Ficha** — em vez de comprimir o workspace desktop. O resultado e os tutoriais do Edison entram no fluxo normal da tela, sem overlays concorrentes. Desktop, fórmulas de Dispatch e save v10 foram preservados.

# Agência Ressonância — Beta 1

## Beta 1 · v0.3.0-beta.8

A Beta 1 introduz arquitetura de persistência **local-first** preparada para Supabase. O jogo continua funcional sem backend; ao configurar `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` e aplicar `supabase/migrations/001_beta1_game_saves.sql`, o menu de conta ativa Auth e save cloud com RLS. Veja `docs/design/BETA1_SUPABASE_ARCHITECTURE.md`.

### Dispatch mobile reliability · beta.7
- Abrir um chamado pela aba CHAMADOS monta o briefing corretamente no mobile, mesmo ele sendo renderizado dentro do workspace do MAPA.
- Briefing passa a usar scroll interno, action bar sem sobreposição e CTA de despacho com alvo touch maior.
- Em telas estreitas os agentes viram uma lista vertical com seleção explícita e botão FICHA.
- Fechar volta à aba de origem; despachar/expirar retorna a CHAMADOS. Desktop e regras de Dispatch não mudaram.

### Hotfix de cadastro mobile · beta.6
- ENTRAR e CRIAR CONTA agora são botões de modo independentes, com `type="button"`, área de toque ampliada e estado ativo acessível.
- Em telas estreitas os dois controles ficam empilhados para evitar sobreposição.
- O formulário oferece um segundo atalho explícito para alternar entre login e cadastro.
- Nenhuma regra de Supabase, save ou gameplay foi alterada.

Para o beta fechado, a conta é propositalmente simples: **e-mail + senha, sem confirmação de e-mail**. Em Supabase, desative `Authentication > Providers > Email > Confirm email`; ao criar a conta, o jogo entra automaticamente e vincula o save cloud.


Novo baseline consolidado a partir da linha funcional v0.9.14.

## Executar

### GitHub Pages (recomendado para compartilhar a Beta)

O repositório do GitHub sempre exibe o `README.md`; o jogo abre na **URL do GitHub Pages**, não na página de arquivos do repositório.

1. Envie este projeto para um repositório GitHub.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. Faça push para `main` ou `master` (ou rode manualmente **Deploy GitHub Pages** em Actions).
4. O workflow `.github/workflows/pages.yml` gera o export estático em `out/` e publica automaticamente.
5. A URL do jogo aparece no job `deploy` e em **Settings → Pages**.

Para Supabase no Pages, cadastre `NEXT_PUBLIC_SUPABASE_URL` como **Repository variable** e `NEXT_PUBLIC_SUPABASE_ANON_KEY` como **Repository secret**. Sem essas variáveis, a Beta continua funcionando em modo local/sem conta.

### Local

No Windows, `Ressonancia.exe` continua disponível como launcher local. Para desenvolvimento: `npm ci` e `npm run dev`. O projeto continua sendo Next.js/React/TypeScript.

## Onde editar conteúdo

Comece por:

- `content/README.md`
- `docs/authoring/WHERE_TO_EDIT.md`
- `docs/authoring/CONTENT_SCHEMA.md`

A regra é simples: **conteúdo em `content/`; lógica em `game/`; telas em `app/`**.

## Fluxo jogável atual

Menu → Novo jogo → Introdução/Tutorial → Central → Briefing/Despacho → Resultado → Desenvolvimento → NEXO pós-expediente → próximo dia.

No pós-expediente, o jogador pode conversar com qualquer personagem com cena disponível, com vários ou com ninguém. Cada personagem mantém uma thread contínua no NEXO, com suporte a conversas longas, autoscroll e progresso romântico opcional.

## Documentação de continuidade

Leia `PROJECT_CONTEXT.md` e `docs/failsafe/` antes de continuar desenvolvimento em outra sessão.


## v0.2.1

Dispatch agora usa banco data-driven de 48 ocorrências aprovadas, composição diária em ondas e afinidades contextuais de poder. Veja `docs/design/INCIDENT_POOL_SYSTEM.md`.

## v0.2.6
Playtest rebalance: NEXO limitado a uma etapa/personagem/noite, lista de contatos limpa, relatórios contextuais, turno de 10 minutos, mais ocorrências/overlap e fadiga mais relevante.


### v0.2.10 — hotfix de fronteira dos dates
O NEXO não oferece mais um botão genérico de encontro ao alcançar a próxima etapa. A saída/date só começa a partir da escolha autorada na conversa da etapa 3 ou 6, evitando pulo prematuro de rota e conflito com o histórico.


### v0.2.11 — romance por etapa
O percentual ROMANCE agora é derivado do progresso estrutural da rota principal; escolhas 100/50/30 não concedem XP social.


## v0.2.15
Dias normais entram direto no expediente sem o modal meta `Preparar expediente`; o primeiro turno guiado continua manual. O acesso a Desenvolvimento foi integrado à shell da Central e a tela Desenvolvimento agora usa os retratos oficiais dos agentes.


NEXO v0.2.15: iniciativa de conversa respeita o remetente autorado e o autoscroll preserva releitura de histórico.


## v0.2.16
Central com primeira camada mais simples, Dispatch mobile por painéis e mapa autoral com ocorrências dinâmicas. Mecânicas e save v9 preservados.

### v0.2.21
Briefing desktop reorganizado para usar melhor a viewport: seleção de equipe ocupa o espaço antes vazio sob a narrativa e o radar permanece à direita. A meta é ver situação, requisitos, equipe e despacho sem rolagem em desktop comum.


### v0.2.22
- Briefing desktop coloca os sete agentes em uma faixa horizontal de largura total, aproveitando o espaço inferior antes ocioso.
- Requisitos de atributos agora são inteiros após a escala diária; radar e chance usam o mesmo alvo discreto.
- Alertas de técnica/afinidade não exibem mais `p.p.`.


### v0.2.23
- Briefing operacional abre por cima do canal do Mapa Tático, sem bloquear a Central inteira.
- Barra inferior de agentes vira o seletor de equipe enquanto o briefing está aberto; o estado selecionado continua visível nos retratos.
- Informações do caso, radar, chance, tags, afinidades, alertas e despacho foram preservados.
- Mobile mantém briefing full-screen com seleção interna. Save schema v9.


### v0.2.24 — legibilidade do briefing
- Ajustes visuais do briefing contextual ficam no bloco `v0.2.24` ao final de `app/globals.css`.
- Não alterar fórmulas/requisitos para reproduzir este ajuste: ele é somente tipográfico.


### v0.2.25 — legibilidade global da Central
- A regra histórica `v0.2.25`, hoje consolidada em `app/agencia/agency.css`, amplia apenas tipografia funcional no desktop.
- Não aumentar o radar para resolver legibilidade textual.


## v0.2.26–v0.2.29 — consolidação e polish
A Central foi decomposta em `components/agency/`; CSS ativo recente vive em `app/agencia/agency.css`. Configurações permitem export/import de save local JSON. Outings aceitam crop por viewport e assets pesados em uso foram otimizados para WebP. Save permanece v9.


## v0.2.38 — menu principal
A abertura usa `public/menu/cidade-noturna.webp` em tela cheia, com fade contínuo para leitura do menu. Textos editáveis ficam em `content/ui/menu.ts`.


## v0.2.40 — fluxo completo de entrada
- Menu principal: Continuar, Novo Jogo, Carregar Jogo, Conta / Acesso e Configurações sem sair da key art da cidade.
- Novo Jogo confirma substituição do save existente e inicia o onboarding.
- Carregar Jogo mostra o slot local e oferece import/export JSON.
- Conta / Acesso oferece Entrar, Criar Conta e Jogar sem Conta; senha não é persistida nesta build e o provider pode ser trocado pelo backend futuro.
- Configurações persistem movimento reduzido e velocidade de mensagens; tela cheia é acionada pelo navegador.
- Salvar e Sair retorna ao menu principal na Central, Desenvolvimento e NEXO.
- Save schema continua v9.


### v0.2.42
Lysandro D1–D6 agora usa autoria final, três fotos no NEXO e dois dates lineares com convites persistentes.


### v0.2.43
Substitui as três fotos de chat de Lysandro pelos arquivos autorais mais recentes e adiciona backgrounds específicos aos Dates 1 e 2.


### v0.2.44
- Date 2 de Lysandro dividido em dois beats lineares: restaurante e casa.
- Ao avançar do restaurante para a casa, o background troca para `public/outings/lysandro/date-2-casa.webp`.
- Texto autoral preservado; sem escolhas novas e sem mudança no save schema v9.
