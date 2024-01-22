// **11. Missing Number**
// Given an array containing n distinct numbers taken from 0 to n, find the missing number.

const array = [1, 3, 5, 7, 8,50];
const n = 50;

function MissingNumber(n,array) {
  let missingvalue = new Array();
  // const lastdigit = array[array.length - 1];
  for (let i = 1; i <= n; i++) {
    if (!array.includes(i)) {
      missingvalue.push(i);
    }
  }
  return missingvalue;
}

console.log(MissingNumber(n,array));
