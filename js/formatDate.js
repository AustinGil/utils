/**
 * @param {string | number | Date} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string | string[]} [locales]
 * @returns {string}
 */
function formatDate(date, options, locales) {
  date = new Date(date);
  options = options || { day: 'numeric', month: 'short', year: 'numeric' };
  locales = locales || navigator.language;

  return new Intl.DateTimeFormat(locales, options).format(date);
}
