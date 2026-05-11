/**
 * @param {string|number} number 
 */
export function formatPhone(number) {
  let cleaned = ('' + number).replace(/\D/g, '');
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    let intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }

  return number;
}
