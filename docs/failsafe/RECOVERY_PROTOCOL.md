# RECOVERY PROTOCOL — v0.2.58

Se o chat/contexto for perdido:

1. usar o ZIP mais recente do projeto como fonte de verdade;
2. ler `PROJECT_CONTEXT.md`;
3. ler `EDIT_HERE.md` e `content/README.md`;
4. ler todos os arquivos em `docs/canon/`, `docs/authoring/`, `docs/design/` e `docs/failsafe/` antes de alterar código ou narrativa;
5. confirmar `package.json` versão **0.2.58** e save schema **v9** em `lib/save.ts`;
6. não reconstruir a partir do antigo `ressonancia-fase1-0.1.1`;
7. não apagar saves para contornar migração;
8. confirmar que Yuki D1–D6 vem de `content/dialogues/post-shift/yuki.ts` e Elysia D1–D6 de `content/dialogues/post-shift/elysia.ts`, não dos placeholders;
9. confirmar assets de mídia em `public/nexo/yuki/` e `public/nexo/elysia/`;
10. confirmar que `PhoneDialogueEngine` suporta imagens e mensagens fixas data-driven, mas não contém falas específicas de Yuki;
11. antes do handoff, atualizar CURRENT_STATE, NEXT_SESSION, CHANGELOG e PROJECT_STATE.json.

## Sistemas que não devem ser revertidos
- banco de 48 casos e afinidades de poder;
- rotas individuais por personagem;
- campanha aberta pós-D6;
- uma etapa social por personagem por noite global;
- NEXO com scroll interno isolado;
- onboarding com Edison e primeiro despacho isolado;
- grupo operacional supervisionável / DMs privadas não supervisionadas;
- conteúdo autoral em `content/`.

- briefing desktop contextual sobre o Mapa Tático; roster inferior persistente seleciona/remove agentes enquanto `ABRIR FICHA` continua abrindo dossiê;
- requisitos inteiros de atributos no Dispatch; radar e chance usam o mesmo alvo discreto.

- v0.2.28: briefing desktop é overlay absoluto dentro de `.mapStageWorkspace`; não reintroduzir grid-column/grid-row no `.mapBriefingLayer` enquanto ele for filho do mapa.

- v0.2.33: Elysia D1–D6 é autoria final; mensagem excluída temporizada é data-driven e dates da Elysia são lineares.

- v0.2.40: menu principal usa `public/menu/cidade-noturna.webp` e fade full-screen separado em `.mainMenuFade`; não voltar ao placeholder de arte nem transformar o fade em card opaco local sem decisão explícita.


- v0.2.40: `app/page.tsx` é o hub de entrada; não voltar a forçar `/login` ou `/novo-jogo` como telas independentes sem decisão explícita. `lib/account.ts` não guarda senha. `SALVAR E SAIR` retorna a `/`.

## v0.2.42 — recuperação da rota de Lysandro
- Fonte autoral principal: `content/dialogues/post-shift/lysandro.ts`. Não restaurar D1–D6 de Lysandro a partir de `placeholders.ts`.
- Assets de chat: `public/nexo/lysandro/chat-1-milkshake.webp`, `chat-2-espelho.webp`, `chat-3-date2.webp`.
- Dates: `content/narrative/outings.ts`, IDs `outing-day3-lysandro` e `outing-day6-lysandro`.
- Convites usam o CTA persistente existente; não voltar a abrir date automaticamente ao responder o chat.



## v0.2.45 — retomada do Date 2 de Lysandro
- A estrutura de dois beats foi validada estaticamente: restaurante → casa.
- QA runtime ainda está pendente por timeout de `npm ci`; não registrar o item como visualmente aprovado até abrir a cena em navegador.
- Não remover `beats` nem voltar a uma única imagem no Date 2; não alterar o texto autoral para completar a transição.


## v0.2.47 — recuperação do modo social-only
- Flag autoritativa: `mode:post-shift-only`.
- Save schema continua v9; não criar migração só para esse modo.
- Em social-only, `shift.status` deve permanecer `finished` e a navegação principal deve resolver para `/conversa`.
- `PRÓXIMA NOITE` incrementa `player.currentDay`, recupera estados dos heróis e cria o próximo shift já finalizado.
- Não remover as guardas de `/introducao`, `/agencia` e `/desenvolvimento` sem substituir por proteção equivalente.


## v0.2.49 — recuperação do hotfix de próxima noite

No modo `mode:post-shift-only`, `finishDay()` deve persistir `nextSave` **e** executar `setSave(nextSave)` ao permanecer em `/conversa`. O botão **PRÓXIMA NOITE** deve passar por `requestFinishDay()` e abrir a confirmação antes de chamar `finishDay()`.


## v0.2.51 — recuperação do leitor de Dates
- `/encontro/[sceneId]` pagina apenas a apresentação; não mover texto narrativo para React.
- `content/narrative/outings.ts` continua sendo a fonte das cenas.
- `outingMilestones`, `routeStage`, `completionFlag` e `routeAdvanceFlag` só mudam ao finalizar a última página.
- `sessionStorage` de página é temporário e não substitui o save v9.


## v0.2.52 — recuperação social
- Confirmar `content/social/routeManifest.ts` e validação D1–D6 + Dates 3/6.
- Confirmar abas Conversas/Fotos/Dates em `/conversa`; replay usa `?replay=1` e não muta save.
- Confirmar `/qa/social` como ferramenta interna e `?qa=1` como preview read-only de Date.
- Não remover flags `nexo:read:*` como se fossem lixo; elas sustentam o estado persistente de novidades e são compatíveis com schema v9.


## v0.2.53 — recuperação do layout NEXO
Se as abas Conversas/Fotos/Dates voltarem a ocupar a altura inteira da lateral, verificar `.nexoConversationList`: o `grid-template-rows` deve conter seis linhas, com `auto` para `.nexoLibraryTabs` antes de `minmax(0,1fr)` de `.nexoContactsScroll`.


## v0.2.54 — recuperação mobile
- Em mobile, `Fotos` e `Dates` devem sempre oferecer retorno explícito para `Conversas`.
- Durante qualquer Date iniciado, deve existir retorno explícito para o NEXO além de `Anterior`; sair antes do fim não conclui o encontro.
- Preservar safe areas e alvos de toque mínimos nos controles mobile adicionados nesta versão.


## v0.2.55 — recuperação da lista/autoscroll
- Ordem da lista é derivada do horário do preview mais recente; não persistir ranking em save.
- Preview é calculado em `app/conversa/page.tsx`; mensagens do Analista usam `Você:` apenas na apresentação da lista.
- Autoscroll fica em `components/PhoneDialogueEngine.tsx`; respeitar `nearBottomRef` para nunca sequestrar a leitura quando o jogador subiu no histórico.
- O botão `nexoJumpLatest` usa a altura medida do compositor para manter-se alcançável.


## v0.2.56 — recuperação da robustez social
- Não remover `game/social/integrity.ts`: o load/import usa esse módulo para normalizar inconsistências sociais recuperáveis sem trocar o schema v9.
- `content/validate.ts` deve continuar validando `vnSceneId`, mídia/alt, flags/IDs e convites finais das rotas autoradas.
- Rodar `npm run validate:social-assets` ao adicionar/substituir fotos ou backgrounds do NEXO/Dates.
- `/qa/social` é ferramenta DEV; ações de concluir/reabrir Date e simular leitura não pertencem ao fluxo do jogador.


## v0.2.57 — recuperação do gate de Date
- `components/PhoneDialogueEngine.tsx` grava a autorização efêmera somente em `startPendingOuting()`.
- `game/social/outingLaunch.ts` centraliza a chave de `sessionStorage`.
- `app/encontro/[sceneId]/page.tsx` exige essa chave para Date normal ainda não concluído; replay/QA ignoram o gate.
- Não substituir esse gate por timer nem por navegação automática ao fim da última mensagem.


## v0.2.58 — recuperação do hotfix de entrada em Date
- A autorização normal de entrada é o query param `launch=1` criado pelo CTA do NEXO; não restaurar o gate por `sessionStorage`.
- `/encontro` ainda deve validar a seleção persistida em `social.outingsByGlobalDay`.
- `sessionStorage` continua permitido apenas para progresso temporário de página do leitor.
