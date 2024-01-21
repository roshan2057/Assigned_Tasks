// **6. Sum of Array Elements**
// Write a function that calculates the sum of all elements in an array.

const array = [1, 8, 2, 2];

function ArraySum(nums) {
  let sum = 0;

  //    nums.forEach(digit => {
  //     sum=sum+digit;
  //    });

  for (const digit of nums) {
    sum = sum + digit;
  }
  
  return sum;
}

console.log(ArraySum(array));
