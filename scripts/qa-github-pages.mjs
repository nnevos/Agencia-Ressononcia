import fs from "node:fs";

const checks = [];
const pass = (name, ok) => checks.push([name, Boolean(ok)]);
const read = (file) => fs.readFileSync(file, "utf8");

const config = read("next.config.ts");
const workflow = read(".github/workflows/pages.yml");
const outingLayout = read("app/encontro/[sceneId]/layout.tsx");
const publicPath = read("lib/publicPath.ts");
const pkg = JSON.parse(read("package.json"));

pass("Next usa output export", config.includes('output: "export"'));
pass("Next usa trailingSlash", config.includes("trailingSlash: true"));
pass("Next usa NEXT_PUBLIC_BASE_PATH", config.includes("NEXT_PUBLIC_BASE_PATH"));
pass("helper publicPath existe", publicPath.includes("export function publicPath"));
pass("Dates possuem generateStaticParams", outingLayout.includes("generateStaticParams") && outingLayout.includes("outingScenes"));
pass("workflow configura Pages", workflow.includes("actions/configure-pages@v5"));
pass("workflow publica out", workflow.includes("path: ./out"));
pass("workflow calcula base path do repo", workflow.includes("NEXT_PUBLIC_BASE_PATH=/$repo_name"));
pass("workflow executa build", workflow.includes("npm run build"));
pass("script QA registrado", pkg.scripts?.["qa:github-pages"] === "node scripts/qa-github-pages.mjs");
pass(".nojekyll incluido", fs.existsSync("public/.nojekyll"));

const assetScanFiles = [
  ...["app", "components", "game"].flatMap((root) => {
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
    return walk(root).filter((file) => /\.(?:ts|tsx|css)$/.test(file));
  }),
];
const badRootAssets = assetScanFiles.filter((file) => {
  const source = read(file);
  return /url\(["']?\//.test(source) || /src=["']\//.test(source);
});
pass("UI sem assets public absolutos quebrando basePath", badRootAssets.length === 0);

let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? "PASS" : "FAIL"} ${name}`); if (!ok) failed++; }
console.log(`\n${checks.length - failed}/${checks.length} checks passaram.`);
if (failed) process.exit(1);
