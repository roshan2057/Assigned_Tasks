var index = 0;
var correct = 0;
var wrong = 0;

const ques = document.querySelector("h2");
const nextbtn = document.querySelector("#next");
const resetbtn = document.querySelector("#reset");
resetbtn.style.display = "none";
const textbox = document.querySelector("#ans");
ques.innerHTML = `Qno${index + 1}: ${data[index].ques}`;

function check() {
  const ans = textbox.value;

  if (ans.toLowerCase() === data[index].ans) {
    correct++;
  } else {
    wrong++;
  }
  textbox.value = "";
  index++;

  if (index < data.length) {
    ques.innerHTML = `Qno${index + 1}: ${data[index].ques}`;
  } else {
    ques.innerHTML = `correct=${correct} wrong=${wrong}`;
    nextbtn.style.display = "none";
    resetbtn.style.display = "block";
  }
}

function reset() {
  index = 0;
  correct = 0;
  wrong = 0;
  ques.innerHTML = `Qno${index + 1}: ${data[index].ques}`;
  nextbtn.style.display = "block";
  resetbtn.style.display = "none";
}
