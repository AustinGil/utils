/**
 * Converts a string from snake_case to camelCase
 * @param {string} str snake_case string
 * @returns {string} camelCase string
 */
exports.camelCase = (str) => {
  return str.replace(/_(\w)/g, (_, c) => c.toUpperCase());
};
/** TESTS
describe('utils.camelCase()', () => {
  it('converts snake_case to camelCase', () => {
    expect(utils.camelCase('a_b')).toBe('aB');
    expect(utils.camelCase('a_b_c')).toBe('aBC');
  });
  it('returns non-snake_case strings unmodified', () => {
    expect(utils.camelCase('ab')).toBe('ab');
    expect(utils.camelCase('aB')).toBe('aB');
    expect(utils.camelCase('a-b')).toBe('a-b');
  });
});
*/

/**
 * Converts a string from camelCase to snake_case
 * @param {string} str camelCase string
 * @returns {string} snake_case string
 */
exports.snakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z]+)/g, (...parts) => `${parts[1]}_${parts[2]}`)
    .toLowerCase();
};
/** TESTS
describe('utils.snakeCase()', () => {
  it('converts camelCase to snake_case', () => {
    expect(utils.snakeCase('aB')).toBe('a_b');
    expect(utils.snakeCase('aBC')).toBe('a_bc');
  });
  it('returns non-snake_case strings unmodified', () => {
    expect(utils.snakeCase('ab')).toBe('ab');
    expect(utils.snakeCase('a_b')).toBe('a_b');
    expect(utils.snakeCase('a-b')).toBe('a-b');
  });
});
*/
