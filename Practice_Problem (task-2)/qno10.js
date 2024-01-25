// **10. Anagram Checker**
// Write a function that checks if two strings are anagrams of each other (contain the same letters,
// ignoring spaces and capitalization).

const string1 = "    heLlo ok";
const string2 = "k Oo Hell  ";

function Anagram(str1, str2) {
  let string1 = str1.trim().split(" ").join("").toLowerCase();
  let string2 = str2.trim().split(" ").join("").toLowerCase();
  if (string1.length === string2.length) {
    return (
      string1.split("").sort().join("") === string2.split("").sort().join("")
    );
  }
  return false;
}

console.log(Anagram(string1, string2));
