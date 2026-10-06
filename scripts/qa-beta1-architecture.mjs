import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = [];
function check(label, condition) { checks.push({ label, pass: Boolean(condition) }); }
function read(file) { return fs.readFileSync(path.join(root, file), "utf8"); }
function exists(file) { return fs.existsSync(path.join(root, file)); }

check("Supabase config exists", exists("lib/supabase/config.ts"));
check("Supabase auth adapter exists", exists("lib/supabase/auth.ts"));
check("Supabase save store exists", exists("lib/supabase/saveStore.ts"));
check("Cloud sync bridge exists", exists("components/CloudSyncBridge.tsx"));
check("RLS migration exists", exists("supabase/migrations/001_beta1_game_saves.sql"));
check("env example exists", exists(".env.example"));

const migration = read("supabase/migrations/001_beta1_game_saves.sql");
check("RLS enabled on game_saves", /enable row level security/i.test(migration));
check("RLS restricts rows to auth.uid", /auth\.uid\(\)\s*=\s*user_id/i.test(migration));
check("No service role exposed in env example", !/SERVICE_ROLE\s*=/i.test(read(".env.example")));

const account = read("lib/account.ts");
check("Preview account removed", !/startPreviewAccountSession/.test(account));
check("Guest mode remains available", /startGuestSession/.test(account));
check("Supabase session refresh implemented", /refreshAuthSession/.test(account));

const save = read("lib/save.ts");
check("Save schema remains v10", /CURRENT_SAVE_VERSION\s*=\s*10/.test(save));
check("Gameplay save writes through local persistence adapter", /writeLocalSaveRaw/.test(save));

const cloud = read("lib/cloudSync.ts");
check("Cloud conflict requires explicit resolution", /status:\s*"conflict"/.test(cloud) && /resolveCloudConflict/.test(cloud));
check("Cloud sync is bound per user", /isCloudSyncBound/.test(cloud));

const pkg = JSON.parse(read("package.json"));
check("Package identifies Beta 1", pkg.version === "0.3.0-beta.4");

const failed = checks.filter((item) => !item.pass);
for (const item of checks) console.log(`${item.pass ? "PASS" : "FAIL"} ${item.label}`);
console.log(`\n${checks.length - failed.length}/${checks.length} PASS`);
if (failed.length) process.exit(1);
