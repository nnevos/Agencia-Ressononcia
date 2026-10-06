import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sources = [
  ...fs.readdirSync(path.join(root, "content/dialogues/post-shift")).filter((name) => name.endsWith(".ts")).map((name) => path.join(root, "content/dialogues/post-shift", name)),
  path.join(root, "content/narrative/outings.ts"),
];

const errors = [];
const checked = new Set();
const mediaPattern = /(?:openingImage|incomingImage|backgroundImage|image)\s*:\s*["'`]([^"'`]+)["'`]/g;

for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(mediaPattern)) {
    const value = match[1];
    if (!value.startsWith("/")) continue;
    const diskPath = path.join(root, "public", value.slice(1));
    const key = `${file}:${value}`;
    if (checked.has(key)) continue;
    checked.add(key);
    if (!fs.existsSync(diskPath)) errors.push(`${path.relative(root, file)} referencia mídia inexistente: ${value}`);
  }
}

if (errors.length) {
  console.error("Validação de assets sociais falhou:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: ${checked.size} referências locais de mídia social existem em public/.`);
