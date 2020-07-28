/**
 * Returns a new object containing only specified properties from input object
 *
 * @param {object} obj object to clone
 * @param {string[]} keys array of keys you want to include in clone
 * @returns {object} Cloned object with only specified keys. Empty object if no keys provided.
 */
exports.cloneOnlyKeys = (obj, keys = []) => {
  return keys.reduce((next, key) => {
    next[key] = obj[key];
    return next;
  }, {});
};
/** TESTS
describe('utils.cloneOnlyKeys()', () => {
  it('clones an object with only specified keys', () => {
    const obj = {
      a: random.word(),
      b: random.word(),
      c: random.word(),
    };
    const clone = utils.cloneOnlyKeys(obj, ['a', 'c']);

    expect(clone.a).toBe(obj.a);
    expect(clone.c).toBe(obj.c);
    expect(clone.b).toBeUndefined();
  });
});
*/

/**
 * Returns a cloned object of the input object, excluding the specified properties
 *
 * @param {DynamicObject} obj Object to clone
 * @param {Array<string>} keys Keys you want to exclude from clone
 * @returns {DynamicObject} Cloned object without specified keys.
 */
exports.cloneExceptKeys = (obj, keys) => {
  return Object.keys(obj).reduce((next, key) => {
    if (!keys.includes(key)) {
      next[key] = obj[key];
    }
    return next;
  }, {});
};
/** TESTS
describe('utils.cloneExceptKeys()', () => {
  it('clones an object excluding specified keys', () => {
    const obj = {
      a: random.word(),
      b: random.word(),
      c: random.word(),
    };
    const clone = utils.cloneExceptKeys(obj, ['b']);

    expect(clone.a).toBe(obj.a);
    expect(clone.c).toBe(obj.c);
    expect(clone.b).toBeUndefined();
  });
});

/**
 * Converts an array of objects to a CSV string
 * @param {Object[]} objs array of objects with matching keys
 * @param {Object} [opts]
 * @param {String} [opts.columnDelimiter=","] string used to separate columns
 * @param {String} [opts.rowDelimiter="\n"] string used to separate rows
 * @return {String} A CSV string with the keys and values from the objects
 */
exports.convertObjectsToCSV = (objs = [], opts = {}) => {
  if (!objs.length) {
    return null
  }

  const colDelimiter = opts.columnDelimiter || ","
  const rowDelimiter = opts.rowDelimiter || "\n"

  const keys = Object.keys(objs[0])

  const values = objs.reduce((res, obj) => {
    const vals = Object.values(obj).join(colDelimiter)
    return res + vals + rowDelimiter
  }, "")

  return keys + rowDelimiter + values.trim()
}

/**
 * Converts an array of objects to a CSV string
 * @param {Object} inObject
 * @return {Object}
 */
const deepClone = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepClone(value)
  }

  return outObject
}
exports.deepClone = deepClone
