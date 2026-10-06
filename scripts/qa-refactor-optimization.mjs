import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = [];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const check = (label, pass) => checks.push({ label, pass: Boolean(pass) });

const pkg = JSON.parse(read("package.json"));
check("Beta 1 refactor version", pkg.version === "0.3.0-beta.9");
check("Shared operational hero selector", exists("game/selectors/operationalHeroes.ts"));
check("Agency uses shared operational selector", /buildOperationalHeroes/.test(read("app/agencia/page.tsx")));
check("DEV tools use same operational selector", /findOperationalHero/.test(read("game/simulation/devTools.ts")));

const localStore = read("lib/persistence/localSaveStore.ts");
check("Idempotent local saves do not increment revision", /currentRaw === raw/.test(localStore) && /return previous \?\? ensureLocalSaveMeta/.test(localStore));

const operations = read("game/simulation/operations.ts");
check("Operational tick exposes persistence policy", /shouldPersistOperationalAdvance/.test(operations));
check("Tutorial pause no longer rewrites clock every tick", !/startedAtEpochMs:\s*now - gameMinute/.test(operations));

const shift = read("game/simulation/shift.ts");
check("Shift runtime uses structural sharing", /incidentsChanged/.test(shift) && /if \(!incidentsChanged/.test(shift));
check("Tutorial clock resumes with one explicit reanchor", /resumeShiftClock/.test(shift) && /resumeShiftClock\(save\.shift\)/.test(read("app/agencia/page.tsx")));

const agency = read("app/agencia/page.tsx");
check("Agency persists only meaningful timer transitions", /shouldPersistOperationalAdvance\(current, advanced\)/.test(agency));
check("Non-critical agency UI is code split", /dynamic\(\(\) => import\("@\/components\/DevTools"\)/.test(agency) && /MissionResultModal/.test(agency));
check("Dead per-second now state removed", !/setNow\(|\[now, setNow\]/.test(agency));

const cloudBridge = read("components/CloudSyncBridge.tsx");
check("Cloud sync prevents overlapping pushes", /inFlight/.test(cloudBridge) && /pending/.test(cloudBridge));

const heroes = read("content/characters/heroes.ts");
const incidents = read("content/incidents/caseBank.ts");
check("Hero lookup index exists", /export const heroById/.test(heroes));
check("Incident lookup index remains available", /export const caseById/.test(incidents));

const failed = checks.filter((item) => !item.pass);
for (const item of checks) console.log(`${item.pass ? "PASS" : "FAIL"} ${item.label}`);
console.log(`\n${checks.length - failed.length}/${checks.length} PASS`);
if (failed.length) process.exit(1);
