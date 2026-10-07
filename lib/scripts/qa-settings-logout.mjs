import fs from "node:fs";
const header=fs.readFileSync("components/agency/AgencyHeader.tsx","utf8");
const page=fs.readFileSync("app/agencia/page.tsx","utf8");
const checks=[
 ["settings-logout-button", header.includes("SAIR DA CONTA") && header.includes("onSignOut")],
 ["logout-clears-account", page.includes("clearAccountSession") && page.includes("await clearAccountSession()")],
 ["logout-preserves-local-save", page.includes("if (save) writeSave(save)")],
 ["logout-returns-auth", page.includes('router.push("/?panel=account")')],
];
let ok=0; for(const [n,v] of checks){ console.log(`${v?"PASS":"FAIL"}  ${n}`); if(v) ok++; }
console.log(`${ok}/${checks.length} verificacoes aprovadas.`); if(ok!==checks.length) process.exit(1);
