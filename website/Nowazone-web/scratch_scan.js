const fs = require('fs');
const html = fs.readFileSync('Nowazone Homepage.dc.html', 'utf8');

// Find all section tags and comments
const lines = html.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('<section') || trimmed.startsWith('<!--') || trimmed.includes('<nav') || trimmed.includes('<footer')) {
    console.log(`Line ${idx + 1}: ${trimmed.slice(0, 120)}`);
  }
});
