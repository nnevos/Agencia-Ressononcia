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
check("entrar e criar conta usam botoes independentes", files.page.includes('setAuthMode("login")') && files.page.includes('setAuthMode("create")') && files.page.includes('aria-pressed={accountMode === "login"}'));
check("fallback de cadastro existe", files.page.includes("accountModeFallback") && files.page.includes("PRIMEIRO ACESSO? CRIAR CONTA") && files.page.includes("JÁ TENHO CONTA → ENTRAR"));
console.log(`\n${passed}/7 PASS`);
