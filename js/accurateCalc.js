function accurateCalc(num1, operator, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (isNaN(num1) || isNaN(num2)) { // Values validation
    return Number.NaN;
  }

  var strNum1 = num1 + '',
    strNum2 = num2 + '',
    dpNum1 = !!(num1 % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0, // Get total decimal places of num1
    dpNum2 = !!(num2 % 1) ? (strNum2.length - strNum2.indexOf('.') - 1) : 0, // Get total decimal places of num2
    multiplier = Math.pow(10, dpNum1 > dpNum2 ? dpNum1 : dpNum2), // Compare dpNum1 and dpNum2, then find value of 10 to the power of the largest between them.
    tempNum1 = Math.round(num1 * multiplier), // Multiply num1 by multiplier to eliminate all decimal places of num1.
    tempNum2 = Math.round(num2 * multiplier), // Multiply num2 by multiplier to eliminate all decimal places of num2.
    result;

  switch (operator.trim()) {
    case '+':
      result = (tempNum1 + tempNum2) / multiplier;
      break;
    case '-':
      result = (tempNum1 - tempNum2) / multiplier;
      break;
    case '*':
      result = (tempNum1 * tempNum2) / (multiplier * multiplier);
      break;
    case '/':
      result = (tempNum1 / tempNum2);
      break;
    case '%':
      result = (tempNum1 % tempNum2) / multiplier;
      break;
    default:
      result = Number.NaN;
  }

  return result;
}
