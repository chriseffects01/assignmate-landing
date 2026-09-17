/*
 * Normalizes content sting or string[] into a single plain text string *
 */

export const stripHtml = (
  htmlString: string | string[] | undefined | null
): string => {
  if (!htmlString) return '';
  const rawHtml = Array.isArray(htmlString) ? htmlString.join(' ') : htmlString;

  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
    return doc.body.textContent || '';
  }
  return rawHtml.replace(/<[^>]*>?/gm, '');
};

/*
 * Safely gets a substring preview (For assignment cards/ previews)*
 */

export const getContentPreview = (
  content: string | string[] | undefined | null,
  maxLength: number = 75
): string => {
  const plaintext = stripHtml(content);
  if (plaintext.length <= maxLength) return plaintext;
  return plaintext.substring(0, maxLength) + '...';
};
