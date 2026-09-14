import fs from 'fs';

const html = fs.readFileSync('Nowazone Homepage.dc.html', 'utf8');
const lines = html.split('\n');

// Find all sections and their contents
const sections = [
  'credibility',
  'problem',
  'finops',
  'capabilities',
  'compare',
  'platforms-tools',
  'services',
  'why',
  'new-to-cloud',
  'engagement',
  'faq',
  'cta',
  'resources',
  'footer',
];

sections.forEach((secId) => {
  const startIdx = lines.findIndex(l => l.includes(`id="${secId}"`) || (secId === 'footer' && l.includes('<footer')));
  if (startIdx !== -1) {
    console.log(`=== SECTION: ${secId} (Line ${startIdx + 1}) ===`);
    for (let i = startIdx; i < Math.min(startIdx + 30, lines.length); i++) {
      const t = lines[i].trim();
      if (t.startsWith('<h') || t.startsWith('<span') || t.startsWith('<p') || t.startsWith('<!--') || t.startsWith('<button')) {
        console.log(`  ${t.slice(0, 100)}`);
      }
      if (i > startIdx + 3 && (t.startsWith('<!--') || t.startsWith('<section') || t.startsWith('<footer'))) {
        break;
      }
    }
  }
});
