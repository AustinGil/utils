/**
 * @param {object} obj Object with values to pluck
 * @param {string[]} keys Keys of the values to pluck
 * @returns {object} New object with keys params and values plucked from original
 */
exports.pluck = (obj, keys) => {
  return keys.reduce((newObj, key) => {
    newObj[key] = obj[key]
    return newObj
  }, {})
}
