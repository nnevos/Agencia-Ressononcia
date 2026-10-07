import fs from 'node:fs';

const page = fs.readFileSync('app/agencia/page.tsx', 'utf8');
const mobile = fs.readFileSync('components/agency/MobileDispatchExperience.tsx', 'utf8');
const result = fs.readFileSync('components/agency/MissionResultModal.tsx', 'utf8');
const css = fs.readFileSync('app/agencia/agency.css', 'utf8');

const checks = [
  ['mobile usa shell operacional proprio', /MobileDispatchExperience/.test(page) && /export function MobileDispatchExperience/.test(mobile)],
  ['mobile nao depende mais do painel MAPA para abrir briefing', /function openBriefingForIncident[\s\S]*setBriefingOpen\(true\)/.test(page) && !/function openBriefingForIncident[\s\S]{0,500}setMobilePanel\("map"\)/.test(page)],
  ['fluxo mobile separa central incidente equipe agentes e nexo', /type Screen = "central" \| "incident" \| "team" \| "agents" \| "nexo"/.test(mobile)],
  ['central mobile lista chamados e resultados', /mobileIncidentList/.test(mobile) && /RESULTADO DISPONÍVEL/.test(mobile)],
  ['detalhe do chamado possui CTA montar equipe', /MONTAR EQUIPE/.test(mobile)],
  ['equipe mobile possui selecao touch e ficha', /mobileHeroRow/.test(mobile) && /FICHA/.test(mobile) && /aria-pressed/.test(mobile)],
  ['resultado mobile e uma superficie dedicada', /export function MobileMissionResult/.test(mobile) && /mobileMissionResult/.test(css)],
  ['resultado desktop fica oculto no mobile', /desktopMissionResult/.test(result) && /\.desktopMissionResult\{display:none!important\}/.test(css)],
  ['Edison fica embutido no fluxo mobile', /mobileEdisonInline/.test(mobile) && /dispatchCoreTutorial[\s\S]*display:none!important/.test(css)],
  ['desktop workspace fica oculto no mobile rework', /\.dispatchUi>\.opsWorkspace\{display:none!important\}/.test(css)],
  ['acao principal respeita safe area', /mobileDispatchActionBar[\s\S]*env\(safe-area-inset-bottom\)/.test(css)],
  ['mobile usa uma unica area rolavel por pagina', /mobileDispatchScroll[\s\S]*overflow-y:auto/.test(css) && /overscroll-behavior:contain/.test(css)],
];

let passed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (ok) passed++;
}
console.log(`\n${passed}/${checks.length} PASS`);
if (passed !== checks.length) process.exit(1);
