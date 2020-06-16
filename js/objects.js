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
