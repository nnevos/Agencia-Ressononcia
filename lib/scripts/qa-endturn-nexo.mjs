import fs from 'node:fs';
const convo = fs.readFileSync('app/conversa/page.tsx','utf8');
const agency = fs.readFileSync('app/agencia/page.tsx','utf8');
const tut = fs.readFileSync('content/narrative/progressiveTutorial.ts','utf8');
const checks = [
  ['NEXO sempre confirma encerramento', convo.includes('function requestFinishDay() {\n    setConfirmNextDay(true);')],
  ['Confirmação explícita da noite', convo.includes('Encerrar esta noite?') && convo.includes('CONFIRMAR E ENCERRAR')],
  ['NEXO explica que conversar é opcional', convo.includes('Você pode conversar com todos. É opcional')],
  ['NEXO explica envio/resposta para avançar', convo.includes('envie/responda para avançar')],
  ['Tutorial explica todos os contatos e opcionalidade', tut.includes('Você pode conversar com todos os contatos disponíveis nesta noite, se quiser.') && tut.includes('Não é obrigatório falar com ninguém')],
  ['Central confirma antes do Desenvolvimento', agency.includes('Encerrar o turno?') && agency.includes('ENCERRAR TURNO → DESENVOLVIMENTO')],
];
let failed=0;
for (const [name, ok] of checks) { console.log(`${ok?'PASS':'FAIL'} ${name}`); if(!ok) failed++; }
if(failed) process.exit(1);
console.log(`${checks.length}/${checks.length} end-turn/NEXO checks passed`);
