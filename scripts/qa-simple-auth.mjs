import fs from "node:fs";

const files = {
  page: fs.readFileSync("app/page.tsx", "utf8"),
  account: fs.readFileSync("lib/account.ts", "utf8"),
  auth: fs.readFileSync("lib/supabase/auth.ts", "utf8"),
  setup: fs.readFileSync("SUPABASE_SETUP_BETA1.md", "utf8"),
};
let passed = 0;
function check(name, ok) { if (!ok) { console.error(`FAIL ${name}`); process.exitCode = 1; } else { console.log(`PASS ${name}`); passed++; } }
check("signup entra automaticamente", files.page.includes("finishCloudLogin(await createAccount"));
check("produto nao pede confirmacao", !files.page.includes("Confirme o e-mail"));
check("signup exige sessao imediata", files.account.includes("if (!result.session)"));
check("setup desativa Confirm email", files.setup.includes("desative Confirm email"));
check("adapter nao expoe fluxo de confirmacao", !files.auth.includes("emailConfirmationRequired"));
check("alternador criar conta usa botao neutro", files.page.includes('type="button" role="tab"') && files.page.includes('setAuthMode("create")'));
check("fallback de cadastro existe", files.page.includes("accountModeFallback") && files.page.includes("NÃO TEM CONTA? CRIAR CONTA"));
console.log(`\n${passed}/7 PASS`);
