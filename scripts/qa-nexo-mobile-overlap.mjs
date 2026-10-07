import fs from 'node:fs';
const css=fs.readFileSync('app/globals.css','utf8');
const page=fs.readFileSync('app/conversa/page.tsx','utf8');
const engine=fs.readFileSync('components/PhoneDialogueEngine.tsx','utf8');
const checks=[
 ['manual-hidden-active-chat', page.includes('agencyManualNexo ${activeContact ? "conversationActive" : ""}') && css.includes('.agencyManualNexo.conversationActive{display:none!important}')],
 ['night-action-hidden-private-mobile', css.includes('.nexoPrivateHeader .nexoEndNightButton{display:none!important}')],
 ['redundant-composer-hidden', engine.includes('nexoChoiceComposer') && css.includes('.nexoChoiceComposer.awaitingSelection{display:none!important}')],
 ['selected-choice-composer-compact', css.includes('.nexoChoiceComposer.hasSelection{')],
 ['settings-remain-mobile', css.includes('.nexoSettingsHost .settingsButton{width:40px;height:40px}')],
];
let pass=0; for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`); if(ok)pass++;}
console.log(`${pass}/${checks.length} PASS`); if(pass!==checks.length)process.exit(1);
