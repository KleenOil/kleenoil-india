/**
 * Strip HTML tags from user input to reduce XSS risk in stored form data.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize plain-text form input: strip HTML, trim, enforce max length.
 */
export function sanitizeText(input: string, maxLength = 5000): string {
  return stripHtml(input).trim().slice(0, maxLength);
}

/**
 * Honeypot field check — bots often fill hidden fields.
 * Returns true if the submission should be rejected as spam.
 */
export function isHoneypotTriggered(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}
