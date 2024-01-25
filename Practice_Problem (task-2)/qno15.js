// **15. Find the Second Largest Number**
// Create a function that finds and returns the second-largest number in an array of numbers.

const array = [12, 4, 5, 7, 2, 13, 4];

function SecondLargest(array) {
  const sorted = array.sort((a, b) => {
    return a - b;
  });
  return sorted[array.length - 2];
}

console.log(SecondLargest(array));
