/**
 * Converts markdown-like formatting in job descriptions to HTML
 * Supports:
 * - **bold** -> <strong>bold</strong>
 * - *italic* -> <em>italic</em>
 * - ## Heading -> <h3>Heading</h3>
 * - • Bullet points
 * - 1. Numbered lists
 * - > Quotes
 * - Line breaks
 */
export function formatJobDescription(text: string): string {
  if (!text) return '';

  let formatted = text;

  // Convert headings (## Heading)
  formatted = formatted.replace(/^## (.+)$/gm, '<h3 class="font-bold text-base mt-4 mb-2">$1</h3>');

  // Convert bold (**text**)
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert italic (*text*)
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert blockquotes (> quote)
  formatted = formatted.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 italic my-2">$1</blockquote>');

  // Convert bullet points (• item or - item)
  const lines = formatted.split('\n');
  let inBulletList = false;
  let inNumberedList = false;
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check for bullet points
    if (trimmedLine.match(/^[•\-\*]\s+(.+)$/)) {
      const content = trimmedLine.replace(/^[•\-\*]\s+/, '');
      if (!inBulletList) {
        processedLines.push('<ul class="list-disc pl-5 space-y-1 my-2">');
        inBulletList = true;
      }
      if (inNumberedList) {
        processedLines.push('</ol>');
        inNumberedList = false;
        processedLines.push('<ul class="list-disc pl-5 space-y-1 my-2">');
      }
      processedLines.push(`<li>${content}</li>`);
    }
    // Check for numbered lists
    else if (trimmedLine.match(/^\d+\.\s+(.+)$/)) {
      const content = trimmedLine.replace(/^\d+\.\s+/, '');
      if (!inNumberedList) {
        processedLines.push('<ol class="list-decimal pl-5 space-y-1 my-2">');
        inNumberedList = true;
      }
      if (inBulletList) {
        processedLines.push('</ul>');
        inBulletList = false;
        processedLines.push('<ol class="list-decimal pl-5 space-y-1 my-2">');
      }
      processedLines.push(`<li>${content}</li>`);
    }
    // Regular line
    else {
      if (inBulletList) {
        processedLines.push('</ul>');
        inBulletList = false;
      }
      if (inNumberedList) {
        processedLines.push('</ol>');
        inNumberedList = false;
      }
      processedLines.push(line);
    }
  }

  // Close any open lists
  if (inBulletList) processedLines.push('</ul>');
  if (inNumberedList) processedLines.push('</ol>');

  formatted = processedLines.join('\n');

  // Convert line breaks to <br />
  formatted = formatted.replace(/\n/g, '<br />');

  return formatted;
}
