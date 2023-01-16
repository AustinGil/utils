/**
 * @param {any} v
 */
const getRawType = (v) => {
  /** @typedef {"string"|"number"|"boolean"|"array"|"function"|"null"|"undefined"|"object"} TypesUnion */
  const type = /** @type {TypesUnion} */ (
    Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
  );
  return type;
};

/** TESTS
describe('utils.getRawType()', () => {
  it('returns the primitive type name for each type', () => {
    expect(utils.getRawType('yo')).toBe('string');
    expect(utils.getRawType(42)).toBe('number');
    expect(utils.getRawType(false)).toBe('boolean');
    expect(utils.getRawType(() => {})).toBe('function');
    expect(utils.getRawType([])).toBe('array');
    expect(utils.getRawType({})).toBe('object');
    expect(utils.getRawType(null)).toBe('null'); // eslint-disable-line unicorn/no-null
    expect(utils.getRawType(undefined)).toBe('undefined'); // eslint-disable-line unicorn/no-useless-undefined
  });
});
*/
