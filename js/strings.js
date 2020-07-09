/**
 * Converts a string from snake_case to camelCase
 * @param {string} str
 * @return {string}
 */
exports.camelCase = (str) => {
  return str.replace(/_(\w)/g, (_, c) => c.toUpperCase());
};

/**
 * Converts a string from camelCase to snake_case
 * @param {string} str
 * @return {string}
 */
exports.snakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z]+)/g, (...parts) => `${parts[1]}_${parts[2]}`)
    .toLowerCase();
};
