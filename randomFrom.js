/**
 * Returns a random value from a given array, given string, or range of numbers.
 * @param {(number|array|string)} [from=0] The lower bound of a range of numbers, or the source string or array to pull from.
 * @param {number} [to=100] The upper bound of a range of numbers.
 * @return {*}
 */
function randomFrom(from = 0, to = 100) {
  if (Array.isArray(from) || typeof from === "string") {
    const index = randomFrom(0, from.length - 1)
    return from[index]
  }
  return Math.floor(Math.random() * (to - from + 1) + from)
}

export default randomFrom
