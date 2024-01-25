// **8. Count Vowels in a String**
// Write a function that counts the number of vowels in a given string.

const string = "HellO";
const vowels_word = ["a", "e", "i", "o", "u"];

function CountVowels(string) {
  let noof_vowels = 0;
  for (const word of string.toLowerCase()) {
    if (vowels_word.includes(word)) {
      noof_vowels++;
    }
  }
  return noof_vowels;
}

console.log(CountVowels(string));
