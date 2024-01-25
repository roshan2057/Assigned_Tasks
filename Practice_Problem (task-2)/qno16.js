// **16. Reverse Words in a String**
// Write a function that reverses the order of words in a sentence.

const orignal = "yesma chai pratek word haru matra ulto huncha";

function ReverseString(string) {
  const reverse = string.split(" ").map((data, index) => {
    return data.split("").reverse().join("");
  });
  return reverse.join(" ");
}

console.log(ReverseString(orignal));
