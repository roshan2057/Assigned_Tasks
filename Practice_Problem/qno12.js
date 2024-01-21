// **12. Remove Duplicates from an Array**
// Write a function that removes duplicate elements from an array.

const array = [0, 3, 2, 4, 5, 0, 3];

function RemoveDuplicate(array) {
  const new_array = array.filter((data, index) => {
    if (array.indexOf(data) === index) {
      return data;
    }
  });
  return new_array;

  // as set is the collection of unique value we can use like this
  // return [... new Set(array)]
}

console.log(RemoveDuplicate(array));
