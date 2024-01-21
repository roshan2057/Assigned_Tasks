// **7. Title Case a Sentence**
// Create a function that converts a sentence to title case (capitalize the first letter of each word).

const sentence = "hi i am just capitalizing each 1st letter";

function TitleCase(sent) {
  const array = sent.split(" ");
  const newarray = array.map((data) => {
    return data[0].toUpperCase() + data.slice(1);
  });

  return newarray.join(" ");
}

console.log(TitleCase(sentence));
