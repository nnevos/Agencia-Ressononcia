import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];
const failures = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}
function check(name, pass, detail) {
  checks.push({ name, pass, detail });
  if (!pass) failures.push({ name, detail });
}
function contains(rel, needle) {
  return read(rel).includes(needle);
}

const pkg = JSON.parse(read('package.json'));
check('versao-baseline', pkg.version === '0.3.0-beta.13', `package.json=${pkg.version}`);
check('save-schema-v10', contains('lib/save.ts', 'CURRENT_SAVE_VERSION = 10'), 'schema esperado: v10');
check('date-gate-launch-query', contains('app/encontro/[sceneId]/page.tsx', 'params.get("launch") !== "1"'), 'Date normal exige ?launch=1');
check('date-cta-persiste-reserva', contains('components/PhoneDialogueEngine.tsx', 'outingsByGlobalDay: { ...current.social.outingsByGlobalDay'), 'CTA persiste seleção da noite');
check('date-cta-navega-explicito', contains('app/conversa/page.tsx', '?launch=1'), 'NEXO navega explicitamente com launch=1');
check('date-progress-session-only', contains('app/encontro/[sceneId]/page.tsx', 'ressonancia:outing-progress:'), 'sessionStorage usado para progresso temporário');
check('pronoun-config', contains('lib/playerText.ts', 'elu-delu') && contains('app/page.tsx', 'PLAYER_PRONOUN_OPTIONS'), 'nome + pronomes configuráveis no novo jogo');
check('post-shift-guard', contains('lib/save.ts', 'mode:post-shift-only'), 'flag de modo pós-expediente presente');
check('qa-social-isolado', fs.existsSync(path.join(root, 'app/qa/social/page.tsx')), '/qa/social existe');

check('nexo-activity-ordering', contains('game/social/nexoLibrary.ts', 'nexo:activity:') && contains('app/conversa/page.tsx', 'activityAt'), 'lista de DMs usa atividade efetiva');
check('intro-group-paced', contains('app/introducao/page.tsx', 'replyRevealCount') && contains('app/introducao/page.tsx', 'AGUARDANDO RESPOSTAS'), 'grupo inicial entrega respostas em sequencia');
check('tutorial-first-case-safe', contains('game/simulation/operations.ts', 'tutorialDecisionPaused') && contains('components/agency/MissionBriefing.tsx', 'SEM LIMITE'), 'E-04 nao expira enquanto aguarda decisao');
check('alexandra-portrait-present', fs.existsSync(path.join(root, 'public/heroes/alexandra.jpg')), 'retrato principal de Alexandra presente');
check('tutorial-progressivo-flags', contains('content/narrative/progressiveTutorial.ts', 'tutorial:development:seen') && contains('content/narrative/progressiveTutorial.ts', 'tutorial:dispatch:resonance:seen') && contains('content/narrative/progressiveTutorial.ts', 'tutorial:nexo:date:seen'), 'flags persistentes cobrem desenvolvimento, dispatch e Date');
check('tutorial-development-contextual', contains('app/desenvolvimento/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.development') && contains('app/desenvolvimento/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.technique') && contains('app/desenvolvimento/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.attribute'), 'Desenvolvimento ensina primeiro upgrade, tecnica e atributo');
check('development-milestone-lock', contains('game/progression/heroProgression.ts', 'progress.pendingMilestoneLevels.length === 0') && contains('app/desenvolvimento/page.tsx', 'pendingMilestoneLevels.length > 0'), 'milestones multiplos continuam bloqueando o pos-expediente ate serem resolvidos');
check('tutorial-mastery-contextual', contains('app/desenvolvimento/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.mastery') && contains('app/desenvolvimento/page.tsx', 'masteryRank > 0'), 'Maestria aparece somente quando existir');
check('tutorial-dispatch-contextual', contains('app/agencia/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.resonance') && contains('app/agencia/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.combo') && contains('app/agencia/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.condition'), 'Dispatch ensina equipe/ressonancia, combo e condicao');
check('tutorial-nexo-contextual', contains('app/conversa/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.postShiftNexo') && contains('app/conversa/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.date'), 'NEXO ensina liberdade pos-expediente e Date');

check('edison-coach-unificado', fs.existsSync(path.join(root, 'components/EdisonCoach.tsx')) && contains('app/agencia/page.tsx', 'EdisonCoach') && contains('app/agencia/page.tsx', 'firstCaseTutorialBubble') && !contains('components/agency/MissionBriefing.tsx', 'briefTutorialCoach'), 'primeiro despacho usa o coach unificado em balao flutuante, sem comprimir o briefing');
check('tutorial-avanca-por-acao', contains('app/desenvolvimento/page.tsx', 'markTutorialFlag(PROGRESSIVE_TUTORIAL_FLAGS.development)') && contains('app/desenvolvimento/page.tsx', '[PROGRESSIVE_TUTORIAL_FLAGS.technique]') && contains('app/desenvolvimento/page.tsx', '[PROGRESSIVE_TUTORIAL_FLAGS.attribute]'), 'desenvolvimento marca aprendizado por selecao/confirmacao real');
check('tutorial-date-por-cta', contains('app/conversa/page.tsx', 'PROGRESSIVE_TUTORIAL_FLAGS.date') && contains('components/PhoneDialogueEngine.tsx', 'highlightOutingTutorial'), 'Date e registrado ao usar o CTA explicito');
check('manual-agencia', fs.existsSync(path.join(root, 'components/AgencyManual.tsx')) && fs.existsSync(path.join(root, 'content/narrative/agencyManual.ts')) && contains('app/agencia/page.tsx', 'AgencyManual') && contains('app/desenvolvimento/page.tsx', 'AgencyManual') && contains('app/conversa/page.tsx', 'AgencyManual'), 'Manual da Agencia disponivel nas superficies centrais');
check('tutorial-spotlight', contains('app/globals.css', 'edisonSpotlightBackdrop') && contains('app/globals.css', 'tutorialTargetPulse'), 'spotlight e destaque pulsante implementados');

const outingText = read('content/narrative/outings.ts');
const manifestText = read('content/social/routeManifest.ts');
const authoredIds = [...manifestText.matchAll(/characterId:\s*\"([^\"]+)\",\s*speaker:[^\n]+authored:\s*true/g)].map((match) => match[1]);
check('manifest-autorado-detectado', authoredIds.length > 0, `rotas autoradas: ${authoredIds.join(', ')}`);
for (const id of authoredIds) {
  check(`outing-d3-${id}`, outingText.includes(`outing-day3-${id}`), `Date 1 de ${id}`);
  check(`outing-d6-${id}`, outingText.includes(`outing-day6-${id}`), `Date 2 de ${id}`);
}


const operationsText = read('content/messages/operations.ts');
const operationsRuntimeText = read('game/data/operationsChat.ts');
const caseBankText = read('content/incidents/caseBank.ts');
const incidentIds = [...caseBankText.matchAll(/id:\s*"((?:pool-[^"]+)|(?:inc-\d+))"/g)].map((match) => match[1]);
const eventCommentIds = [...operationsText.matchAll(/"((?:pool-[emhc]-\d+)|(?:inc-\d+))": \[/g)].map((match) => match[1]);
check('nexo-contextual-case-coverage', incidentIds.every((id) => eventCommentIds.includes(id)), `${eventCommentIds.length}/${incidentIds.length} casos com comentario pre-despacho`);
check('nexo-contextual-affinity', contains('content/messages/operations.ts', 'affinityMissionLines') && contains('game/data/operationsChat.ts', 'affinityMissionLines[incident.id]'), 'afinidade contextual participa das mensagens');
check('nexo-contextual-team', contains('content/messages/operations.ts', 'pairDialogue') && contains('game/data/operationsChat.ts', 'contextualTeamLine'), 'composicao da equipe altera dialogo');
check('nexo-contextual-outcomes', contains('content/messages/operations.ts', 'teamOutcomeReactions') && contains('game/data/operationsChat.ts', 'complete-reaction'), 'resultado gera retorno e reacao da equipe');

const socialValidator = path.join(root, 'scripts/validate-social-assets.mjs');
check('validador-assets-social', fs.existsSync(socialValidator), 'scripts/validate-social-assets.mjs presente');

console.log('\nRESSONANCIA - QA FLOW STATIC');
console.log('='.repeat(72));
for (const item of checks) {
  console.log(`${item.pass ? 'PASS' : 'FAIL'}  ${item.name}${item.detail ? ` - ${item.detail}` : ''}`);
}
console.log('='.repeat(72));
console.log(`${checks.length - failures.length}/${checks.length} verificacoes aprovadas.`);
if (failures.length) {
  console.error('\nFalhas que podem indicar regressao de fluxo:');
  for (const item of failures) console.error(`- ${item.name}: ${item.detail}`);
  process.exitCode = 1;
}
