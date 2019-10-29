/**
 * Converts an array of objects to a CSV string
 * @param {Object[]} objs array of objects with matching keys
 * @param {Object} [opts]
 * @param {String} [opts.columnDelimiter=","] string used to separate columns
 * @param {String} [opts.rowDelimiter="\n"] string used to separate rows
 * @return {String} A CSV string with the keys and values from the objects
 */
function convertObjectsToCSV(objs = [], opts = {}) {
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

module.exports = convertObjectsToCSV
