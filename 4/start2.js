const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let counter = 0;

rl.on("line", (line) => {
  const fieldNumbers = [];
  const bothFields = line.split(",");

  bothFields.forEach((field) => {
    let twoNumbers = field.split("-");
    twoNumbers = twoNumbers.map((numberAsString) => {
      return parseInt(numberAsString);
    });
    const start = twoNumbers[0];
    const end = twoNumbers[1];
    const range = [...Array(end - start + 1).keys()].map((x) => x + start);
    fieldNumbers.push(range);
  });

  if (fieldNumbers[0].some((number) => fieldNumbers[1].includes(number))) {
    counter = counter + 1;
  } else if (
    fieldNumbers[1].some((number) => fieldNumbers[0].includes(number))
  ) {
    counter = counter + 1;
  }
});

rl.on("close", () => {
  console.log(counter);
});
