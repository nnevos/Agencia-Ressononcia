import fs from 'node:fs';
const css=fs.readFileSync('app/agencia/agency.css','utf8');
const checks=[
 ['desktop wrapper owns content grid area',/\.mapBriefingLayer \.briefScrollBody\s*\{[\s\S]*?grid-area:content;/],
 ['desktop wrapper scrolls vertically',/\.mapBriefingLayer \.briefScrollBody\s*\{[\s\S]*?overflow-y:auto;/],
 ['desktop wrapper can shrink inside modal',/\.mapBriefingLayer \.briefScrollBody\s*\{[\s\S]*?min-height:0;/],
 ['inner briefing no longer claims modal grid area',/\.mapBriefingLayer \.briefGrid\s*\{[\s\S]*?grid-area:auto;/],
 ['modal footer remains its own grid area',/\.mapBriefingLayer \.missionBriefModal>footer\s*\{[\s\S]*?grid-area:footer;/],
 ['mobile full-screen briefing preserved',/@media\(max-width:980px\)[\s\S]*?\.mapBriefingLayer \.briefScrollBody\s*\{[\s\S]*?overflow-y:auto;/]
];
let pass=0;
for(const [name,re] of checks){const ok=re.test(css);console.log(`${ok?'PASS':'FAIL'} ${name}`);if(ok)pass++;}
console.log(`${pass}/${checks.length} PASS`);if(pass!==checks.length)process.exit(1);
