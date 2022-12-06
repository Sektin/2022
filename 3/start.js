const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let prioSum = 0;

rl.on("line", (line) => {
  const itemAmount = line.length;
  const firstCompartment = line.substring(0, itemAmount / 2);
  const secondCompartment = line.substring(itemAmount / 2);
  let foundChar = "";
  let charCode = 0;
  let prio = 0;

  for (const char1 of firstCompartment) {
    if (foundChar) {
      break;
    }
    for (const char2 of secondCompartment) {
      if (char1 === char2) {
        foundChar = char1;
        charCode = char1.charCodeAt(0);
      }
    }
  }

  if (charCode < 97) {
    // upper case
    prio = charCode - 64 + 26;
  }

  if (charCode > 96) {
    // lower case
    prio = charCode - 96;
  }

  prioSum = prioSum + prio;
});

rl.on("close", () => {
  console.log(prioSum);
});
