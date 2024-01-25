// **5. FizzBuzz**
// Write a program that prints numbers from 1 to 100. For multiples of 3, print "Fizz"; for multiples of 5,
// print "Buzz"; and for multiples of both 3 and 5, print "FizzBuzz".

function FizzBuzz() {
  let i = 1;
  while (i <= 100) {
    if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
    i++;
  }
}

FizzBuzz();
