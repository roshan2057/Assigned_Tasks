// **9. Fibonacci Sequence**
// Implement a function that generates the Fibonacci sequence up to a specified number of terms.

const upto = 20;

function Fibonacci(num) {
  const series = [0, 1];
  for (let i = 0; i < num - 2; i++) {
    series.push(series[i] + series[i + 1]);
  }
  return series;
}

console.log(Fibonacci(upto));
