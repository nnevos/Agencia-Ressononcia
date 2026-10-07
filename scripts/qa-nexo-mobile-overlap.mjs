import fs from 'node:fs';
const css=fs.readFileSync('app/globals.css','utf8');
const page=fs.readFileSync('app/conversa/page.tsx','utf8');
const engine=fs.readFileSync('components/PhoneDialogueEngine.tsx','utf8');
const compact=(value)=>value.replace(/\s+/g,'');
const cssCompact=compact(css);
const pageCompact=compact(page);
const engineCompact=compact(engine);
const checks=[
 ['manual-hidden-active-chat', page.includes('agencyManualNexo nexoManualFloating') && page.includes('conversationActive') && cssCompact.includes('.agencyManualNexo.conversationActive{display:none!important')],
 ['night-action-hidden-private-mobile', cssCompact.includes('.nexoPrivateHeader.nexoEndNightButton{display:none!important}') || cssCompact.includes('.nexoPrivateHeader.nexoEndNightButton{display:none!important') || cssCompact.includes('.nexoPrivateHeader.nexoEndNightButton{display:none!important;}') || cssCompact.includes('.nexoPrivateHeader.nexoEndNightButton{display:none!important;') || cssCompact.includes('.nexoPrivateHeader.nexoEndNightButton{display:none!important}')],
 ['redundant-composer-hidden', engine.includes('nexoChoiceComposer') && cssCompact.includes('.nexoChoiceComposer.awaitingSelection{display:none!important')],
 ['selected-choice-composer-compact', cssCompact.includes('.nexoChoiceComposer.hasSelection{position:relative;bottom:auto;display:grid!important;')],
 ['settings-remain-mobile', cssCompact.includes('.nexoSettingsHost.settingsButton{width:40px;height:40px;min-width:40px;')],
 ['desktop-settings-host-inside-messenger', pageCompact.includes('<divclassName="nexoMessengerShell"><divclassName="nexoSettingsHostsettingsHost">')],
 ['desktop-settings-anchored-top-right', cssCompact.includes('.nexoMessengerShell>.nexoSettingsHost{position:absolute;top:0;right:0;z-index:190;}')],
 ['desktop-thread-reserves-settings-space', cssCompact.includes('.nexoPrivateHeader{padding-right:164px;}')],
 ['desktop-settings-menu-opens-below-control', cssCompact.includes('.nexoMessengerShell>.nexoSettingsHost.settingsMenu.nexoSettingsMenu{top:62px;right:0;}')],
];
let pass=0; for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`); if(ok)pass++;}
console.log(`${pass}/${checks.length} PASS`); if(pass!==checks.length)process.exit(1);
