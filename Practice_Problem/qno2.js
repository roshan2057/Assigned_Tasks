// **2. Factorial Calculation**
// Write a function to calculate the factorial of a given positive integer.



const number = 5;

function Factorial(num) {
  var fact = 1;
  if (num < 0) {
    return "Enter positive number";
  }
  while (num > 0) {
    fact = fact * num;
    num--;
  }
  return fact;
}

console.log(Factorial(number));
