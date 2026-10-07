import fs from 'node:fs';

const ending = fs.readFileSync('game/social/ending.ts','utf8');
const finalPage = fs.readFileSync('app/final/page.tsx','utf8');
const outing = fs.readFileSync('app/encontro/[sceneId]/page.tsx','utf8');
const nexo = fs.readFileSync('app/conversa/page.tsx','utf8');
const menu = fs.readFileSync('app/page.tsx','utf8');
const css = fs.readFileSync('app/globals.css','utf8');
const checks = [
  ['ending derives from all romance milestones', ending.includes('isRomanceGame100Complete(save)')],
  ['ending is one-time through persistent flag', ending.includes('campaign:all-romances-ending-seen') && ending.includes('shouldShowRomanceEnding')],
  ['last Date routes to final when appropriate', outing.includes('shouldShowRomanceEnding(nextSave) ? "/final" : "/conversa"')],
  ['NEXO catches pre-existing completed saves', nexo.includes('shouldShowRomanceEnding(save)) router.replace("/final")')],
  ['menu resume catches unseen ending', menu.includes('if (shouldShowRomanceEnding(save)) return "/final"')],
  ['final screen can continue playing', finalPage.includes('CONTINUAR JOGANDO') && finalPage.includes('router.replace("/conversa")')],
  ['final screen can return to menu', finalPage.includes('VOLTAR AO MENU') && finalPage.includes('router.replace("/")')],
  ['final screen states infinite operational loop', finalPage.includes('LOOP INFINITO LIBERADO') && finalPage.includes('despachos sem limite')],
  ['final screen marks ending as seen without save schema change', finalPage.includes('markRomanceEndingSeen(current)')],
  ['final screen is mobile responsive', css.includes('.romanceEndingPage') && css.includes('max-height:100dvh') && css.includes('env(safe-area-inset-bottom)')],
];
let failed=0;
for (const [name, ok] of checks) { console.log(`${ok?'PASS':'FAIL'} ${name}`); if(!ok) failed++; }
console.log(`${checks.length-failed}/${checks.length} endgame checks passed`);
if (failed) process.exit(1);
