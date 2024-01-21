// **17. Validate Email Address**
// Implement a function that validates if a given string is a valid email address.

const email = "roshankarki@gmail.np";

// regular express for email verification gmail and yahoo domain is noly accepted
const reg = /^[\a-z0-9]+@([\(gmail|yahoo)]+\.)+[\w-]{2,4}$/;

function ValidateEmail(email) {
  return reg.test(email);
}

console.log(ValidateEmail(email));
