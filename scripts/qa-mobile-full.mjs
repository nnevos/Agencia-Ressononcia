import fs from 'node:fs';

const css = fs.readFileSync('app/globals.css', 'utf8');
const agencyCss = fs.readFileSync('app/agencia/agency.css', 'utf8');
const agency = fs.readFileSync('app/agencia/page.tsx', 'utf8');

const checks = [
  ['NEXO uses 100dvh on mobile', css.includes('.nexoConversationPane{') && css.includes('height:100dvh')],
  ['NEXO composer is vertically scrollable on mobile', css.includes('.nexoComposerArea{') && css.includes('max-height:min(48dvh,390px)')],
  ['Reply suggestions become a single mobile column', css.includes('.nexoReplySuggestions{') && css.includes('grid-template-columns:1fr!important')],
  ['Send button has a touch-sized target', css.includes('.nexoSendButton{width:48px!important;height:48px!important')],
  ['Chat history wraps long text', css.includes('overflow-wrap:anywhere')],
  ['Development becomes a vertically scrollable page', css.includes('.developmentPage{') && css.includes('min-height:100dvh!important')],
  ['Story dialogue is constrained to the viewport', css.includes('.storyDialogue{') && css.includes('max-height:58dvh')],
  ['Result modal marks Central as modal-open', agency.includes('resultModalOpen')],
  ['Result modal owns the mobile viewport', agencyCss.includes('.reportResultModal{') && agencyCss.includes('height:100dvh!important')],
  ['Result action stays reachable above safe area', agencyCss.includes('.reportResultModal>footer{') && agencyCss.includes('env(safe-area-inset-bottom)')],
  ['Agent dossier owns the mobile viewport', agencyCss.includes('.heroInfoModal,.heroInfoModalClean{') && agencyCss.includes('height:100dvh!important')],
  ['Manual launcher respects mobile safe area', css.includes('.agencyManualLauncher{right:10px!important;bottom:max(10px,env(safe-area-inset-bottom))!important}')],
];

let passed = 0;
for (const [label, ok] of checks) {
  if (ok) {
    passed++;
    console.log(`PASS ${label}`);
  } else {
    console.error(`FAIL ${label}`);
  }
}
console.log(`\n${passed}/${checks.length} mobile full-review checks passed.`);
if (passed !== checks.length) process.exit(1);
