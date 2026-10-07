import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const component = read("components/BackgroundMusic.tsx");
const settings = read("lib/settings.ts");
const header = read("components/agency/AgencyHeader.tsx");
const menu = read("app/page.tsx");
const layout = read("app/layout.tsx");
const checks = [
  ["audio-tha-asset", fs.existsSync("public/audio/aphex-twin-tha.mp3")],
  ["audio-delphium-asset", fs.existsSync("public/audio/aphex-twin-delphium.mp3")],
  ["dispatch-track", component.includes('/agencia') && component.includes('aphex-twin-tha.mp3')],
  ["nexo-track", component.includes('/conversa') && component.includes('aphex-twin-delphium.mp3')],
  ["loop-enabled", component.includes('audio.loop = true')],
  ["default-volume-10", settings.includes('musicVolume: 0.1')],
  ["settings-persist-volume", settings.includes('musicVolume: Math.max') && settings.includes('ressonancia:settings')],
  ["agency-volume-slider", header.includes('Volume da música') && header.includes('type="range"')],
  ["menu-volume-slider", menu.includes('Volume da música') && menu.includes('settings.musicVolume')],
  ["global-player-mounted", layout.includes('<BackgroundMusic />')],
  ["github-pages-public-path", component.includes('publicPath(track.src)')],
];
let ok = 0;
for (const [name, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  if (pass) ok++;
}
console.log(`${ok}/${checks.length} verificacoes aprovadas.`);
if (ok !== checks.length) process.exit(1);
