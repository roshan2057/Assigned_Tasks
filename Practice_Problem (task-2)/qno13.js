// **13. Calculate the Power**
// Implement a function that calculates x^n (x raised to the power of n) without using the `Math.pow()`
// method.

const x = 2;
const n = 3;

function Power(num, power) {
  let result = 1;
  while (power > 0) {
    result = result * num;
    power--;
  }
  return result;
}

console.log(Power(x, n));
