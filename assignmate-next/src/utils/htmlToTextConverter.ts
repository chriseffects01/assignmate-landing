export function htmlToText(html: string): string {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  function convertNode(node: Node, depth = 0): string {
    // Text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const element = node as HTMLElement;
    const tag = element.tagName.toLowerCase();

    // Ignore elements that shouldn't appear in plain text
    if (['script', 'style', 'noscript'].includes(tag)) {
      return '';
    }

    // Handle line breaks
    if (tag === 'br') return '\n';

    // Handle horizontal rules
    if (tag === 'hr') return '\n' + '─'.repeat(40) + '\n';

    // Handle lists
    if (tag === 'li') {
      const parent = element.parentElement;
      const isOrdered = parent?.tagName.toLowerCase() === 'ol';

      let prefix = '• ';

      if (isOrdered && parent) {
        const items = Array.from(parent.children).filter(
          child => child.tagName.toLowerCase() === 'li'
        );

        const index = items.indexOf(element) + 1;
        prefix = `${index}. `;
      }

      const content = Array.from(element.childNodes)
        .map(child => convertNode(child, depth + 1))
        .join('')
        .trim();

      return `${'  '.repeat(depth)}${prefix}${content}\n`;
    }

    // Handle tables
    if (tag === 'tr') {
      const cells = Array.from(element.children).map(cell =>
        Array.from(cell.childNodes)
          .map(child => convertNode(child, depth))
          .join('')
          .trim()
      );

      return cells.join('\t') + '\n';
    }

    if (tag === 'td' || tag === 'th') {
      return Array.from(element.childNodes)
        .map(child => convertNode(child, depth))
        .join('');
    }

    // Handle block-level elements
    const blockElements = [
      'p',
      'div',
      'section',
      'article',
      'header',
      'footer',
      'blockquote',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'table',
      'pre',
    ];

    const content = Array.from(element.childNodes)
      .map(child => convertNode(child, depth))
      .join('');

    if (blockElements.includes(tag)) {
      return `\n${content.trim()}\n`;
    }

    return content;
  }

  return (
    Array.from(document.body.childNodes)
      .map(node => convertNode(node))
      .join('')
      // Remove excessive whitespace while preserving line breaks
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
