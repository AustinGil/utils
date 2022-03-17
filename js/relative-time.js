/** @see https://gist.github.com/LewisJEllis/9ad1f35d102de8eee78f6bd081d486ad */
/**
 * @param {Date | number | string} date
 * @param {string?} lang
 */
export function getRelativeTimeString(date, lang = "en") {
  const time = typeof date === "number" ? date : date.getTime();
  const deltaSeconds = Math.round((time - Date.now()) / 1000);
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  /** @type {Intl.RelativeTimeFormatUnit[]} */
  const units = ["second", "minute", "hour", "day", "week", "month", "year"];
  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
  const divider = unitIndex ? cutoffs[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divider), units[unitIndex]);
}
