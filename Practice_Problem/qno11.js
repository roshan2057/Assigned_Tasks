// **11. Missing Number**
// Given an array containing n distinct numbers taken from 0 to n, find the missing number.

const array = [1, 3, 5, 7, 8, 9,11, 12];

function MissingNumber(array) {
  let missingvalue = new Array();
  const lastdigit = array[array.length - 1];
  for (let i = 0; i <= lastdigit; i++) {
    if (!array.includes(i)) {
      missingvalue.push(i);
    }
  }
  return missingvalue;
}

console.log(MissingNumber(array));
