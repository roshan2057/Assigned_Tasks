// **1. Reverse a String**
// Write a function to reverse a given string without using the built-in `reverse()` method.

const original = "Roshan karki";

function Reverse(string) {
  const rev = new Array();
  for (let i = string.length - 1; i >= 0; i--) {
    rev.push(string[i]);
  }
  return rev.join("");
}

console.log(Reverse(original));
