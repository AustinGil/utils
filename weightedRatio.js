/**
 * A function that converts a number to another based on a weighted conversion function.
 * @function applyConversion
 * @param {number} responseCode
 * @return {number} responseMessage
 */

/**
 * Creates a function that applies the weighted conversion between two ranges.
 * @param { number } oldMin The old range minimum value
 * @param { number } oldMax The old range maximum value
 * @param { number } newMin The new range minimum value
 * @param { number } newMax The new range maximum value
 * @returns { applyConversion }
 */
const weightedRatio = (oldMin, oldMax, newMin, newMax) => value => {
  return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin
}

/** Explanation:
first part gets a value between 0-1
second part maps it to the new range
*/

/** Usage:
const map1_10To0_75 = weightedRatio(1, 10, 0, 75)
console.log(map1_10To0_100(1)) // 0
console.log(map1_10To0_100(2)) // 8.333333333333332
console.log(map1_10To0_100(3)) // 16.666666666666664 
console.log(map1_10To0_100(4)) // 25
console.log(map1_10To0_100(5)) // 33.33333333333333 
console.log(map1_10To0_100(6)) // 41.66666666666667 
console.log(map1_10To0_100(7)) // 50
console.log(map1_10To0_100(8)) // 58.333333333333336 
console.log(map1_10To0_100(9)) // 66.66666666666666
console.log(map1_10To0_100(10)) // 75
/*
