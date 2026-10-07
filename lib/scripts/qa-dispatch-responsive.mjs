import fs from "node:fs";

const page = fs.readFileSync("app/agencia/page.tsx", "utf8");
const briefing = fs.readFileSync("components/agency/MissionBriefing.tsx", "utf8");
const css = fs.readFileSync("app/agencia/agency.css", "utf8");

const checks = [
  ["briefing receives recent operational messages", page.includes("recentOperationsMessages={chatMessages.slice(-3)}")],
  ["briefing renders operational message mirror", briefing.includes('className="briefOpsMessages"')],
  ["message mirror includes sender and game time", briefing.includes("formatGameTime(chat.minute)")],
  ["message mirror is visible on constrained desktop", css.includes("max-width:1400px") && css.includes("max-height:900px")],
  ["message mirror is always visible in mobile briefing", css.includes("@media(max-width:980px)") && css.includes(".mapBriefingLayer .briefOpsMessages")],
  ["operational chat feed can shrink and scroll", css.includes(".opsChatRail .chatFeed") && css.includes("min-height:0") && css.includes("overflow-y:auto")],
  ["long operational text wraps instead of escaping", css.includes("overflow-wrap:anywhere")],
  ["low-height desktop frees vertical space", css.includes("max-height:760px") && css.includes("grid-template-rows:48px minmax(0,1fr) 38px")],
  ["narrow desktop can drop QA badge", css.includes("max-width:1220px") && css.includes(".placeholderBadge{display:none}")],
];
let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} - ${name}`);
  if (!ok) failed++;
}
if (failed) process.exit(1);
console.log(`PASS - ${checks.length}/${checks.length} responsive dispatch messaging checks`);
