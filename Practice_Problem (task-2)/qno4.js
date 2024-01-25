// **4. Find the Longest Word**
// Write a function that finds and returns the longest word in a sentence.

const sentence = "oe aryan k gardai chau timi";

function LongestWord(sent) {
  let longest_word = "";
  let ArrayList = sent.split(' ');

  ArrayList.forEach((element) => {
    if (element.length > longest_word.length) {
      longest_word = element;
    }
    // console.log(element)
  });

  return longest_word;
}

console.log(LongestWord(sentence));
