import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const agency = read("app/agencia/page.tsx");
const header = read("components/agency/AgencyHeader.tsx");
const pkg = JSON.parse(read("package.json"));
const checks = [];
const check = (name, ok) => { checks.push([name, Boolean(ok)]); console.log(`${ok ? "PASS" : "FAIL"} ${name}`); };

check("version beta.9", pkg.version === "0.3.0-beta.9");
check("tick operacional respeita pausa", agency.includes("if (clockPausedRef.current) return;"));
check("FICHA ativa pausa", agency.includes("Boolean(heroInfoId || progressiveTutorialKey)"));
check("tutorial de ressonancia participa do bloqueio", agency.includes('PROGRESSIVE_TUTORIAL_FLAGS.resonance'));
check("tutorial de combo participa do bloqueio", agency.includes('PROGRESSIVE_TUTORIAL_FLAGS.combo'));
check("tutorial de condicao participa do bloqueio", agency.includes('PROGRESSIVE_TUTORIAL_FLAGS.condition'));
check("pausa sincroniza estado antes de congelar", agency.includes("advanceOperationalState(current, now)"));
check("retomada desconta duracao real da pausa", agency.includes("startedAtEpochMs: current.shift.startedAtEpochMs + pauseDurationMs"));
check("retomada persiste uma vez", agency.includes("writeSave(resumed);"));
check("cabecalho recebe estado pausado", agency.includes("clockPaused={clockPausedByUi}"));
check("cabecalho sinaliza pausa", header.includes("PAUSADO · LEITURA"));

const failed = checks.filter(([, ok]) => !ok);
console.log(`\n${checks.length - failed.length}/${checks.length} PASS`);
if (failed.length) process.exit(1);
