import fs from 'fs';

const html = fs.readFileSync('Nowazone Homepage.dc.html', 'utf8');
const lines = html.split('\n');

const heroLines = lines.slice(180, 575);
console.log('Hero line count:', heroLines.length);

// Print key tags and elements inside hero
heroLines.forEach((l, i) => {
  const lineNum = 181 + i;
  const t = l.trim();
  if (t.startsWith('<div') || t.startsWith('<h') || t.startsWith('<button') || t.startsWith('<p') || t.startsWith('<!--') || t.startsWith('<input') || t.startsWith('<span') && t.length < 80) {
    console.log(`${lineNum}: ${t.slice(0, 100)}`);
  }
});
