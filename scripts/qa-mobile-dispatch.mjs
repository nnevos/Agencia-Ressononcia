import fs from 'node:fs';

const page = fs.readFileSync('app/agencia/page.tsx', 'utf8');
const briefing = fs.readFileSync('components/agency/MissionBriefing.tsx', 'utf8');
const css = fs.readFileSync('app/agencia/agency.css', 'utf8');

const checks = [
  ['briefing mobile monta o painel do mapa', /function openBriefingForIncident[\s\S]*setMobilePanel\("map"\)/.test(page)],
  ['origem do painel e preservada ao fechar', /briefingOriginPanelRef\.current = mobilePanel/.test(page) && /setMobilePanel\(briefingOriginPanelRef\.current\)/.test(page)],
  ['apos despacho volta para fila de chamados', /function dispatchFromBriefing[\s\S]*setMobilePanel\("incidents"\)/.test(page)],
  ['briefing possui regiao de scroll dedicada', /className="briefScrollBody"/.test(briefing) && /\.briefScrollBody\{display:contents\}/.test(css)],
  ['mobile modal usa flex e overflow controlado', /@media\(max-width:980px\)[\s\S]*\.mapBriefingLayer \.missionBriefModal\{[\s\S]*display:flex;[\s\S]*overflow:hidden/.test(css)],
  ['mobile scroll body usa momentum touch', /\.mapBriefingLayer \.briefScrollBody\{[\s\S]*overflow-y:auto;[\s\S]*-webkit-overflow-scrolling:touch/.test(css)],
  ['footer mobile nao usa fixed overlay', /\.mapBriefingLayer \.missionBriefModal>footer\{[\s\S]*position:relative/.test(css)],
  ['CTA de despacho possui alvo touch amplo', /\.mapBriefingLayer \.briefDispatch\{[\s\S]*min-height:52px/.test(css)],
  ['cards mobile mostram selecao explicita', /briefHeroSelectionMark/.test(briefing) && /\.briefHero\.selected \.briefHeroSelectionMark/.test(css)],
  ['selecao de agente informa aria-pressed', /aria-pressed=\{selected\}/.test(briefing)],
  ['layout estreito usa lista de agentes', /@media\(max-width:600px\)[\s\S]*\.mapBriefingLayer \.briefHeroGrid\{grid-template-columns:1fr/.test(css)],
  ['Edison nao cobre CTA no briefing mobile', /firstCaseTutorialBubble[\s\S]*top:calc\(70px \+ env\(safe-area-inset-top\)\)[\s\S]*bottom:auto/.test(css)],
];

let passed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (ok) passed++;
}
console.log(`\n${passed}/${checks.length} PASS`);
if (passed !== checks.length) process.exit(1);
