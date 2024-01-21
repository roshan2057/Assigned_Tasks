// **14. Merge Sorted Arrays**
// Write a function that merges two sorted arrays into a single sorted array.

const array1 = [0, 2, 4, 7, 15, 16];
const array2 = [5, 7, 8, 9, 11, 13];

function MergeArray(arr1, arr2) {
  const merge = arr1.concat(arr2).sort((a, b) => {
    return a - b;
  });
  return [...new Set(merge)];
}

console.log(MergeArray(array1, array2));
