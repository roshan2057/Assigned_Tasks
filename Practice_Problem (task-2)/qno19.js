// **19. Check for Balanced Brackets**
// Implement a function that checks if a string with brackets (e.g., "{[()]}" or "[(){}]") is balanced.

const string = "{[()]}";

function CheckBrackets(string) {
  const check = string.split("");
  let stack = [];
  for (const word of check) {
    if (word == "(" || word == "{" || word == "[") {
      stack.push(word);
    } else if (
      (stack[stack.length - 1] == "(" && word == ")") ||
      (stack[stack.length - 1] == "{" && word == "}") ||
      (stack[stack.length - 1] == "[" && word == "]")
    ) {
      stack.pop();
    }
  }

  return stack.length ? false : true;
}

console.log(CheckBrackets(string));
