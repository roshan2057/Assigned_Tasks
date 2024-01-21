// **3. Palindrome Checker**
// Create a function that checks if a given string is a palindrome (reads the same backward as forward).

const orginal = "DAD";

function PalindromeCheck(string) {
  return string === string.split("").reverse().join("");
}

console.log(PalindromeCheck(orginal));
