// **18. Find the Intersection of Two Arrays**
// Write a function that finds the intersection (common elements) of two arrays.

const array1 = [5, 2, 0, 4, 9];
const array2 = [4, 0, 1, 6, 2];

function Intersection(array1, array2) {
  return array1.filter((element) => array2.includes(element));
}

console.log(Intersection(array1, array2));
