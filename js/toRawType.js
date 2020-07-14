/**
 * @param {*} v
 * @returns {("string"|"number"|"boolean"|"array"|"function"|"null"|"undefined"|"object")}
 */
const getRawType = (v) => {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
};
