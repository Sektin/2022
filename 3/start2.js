const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let lineAboveAbove = "";
let lineAbove = "";
let lineCounter = 0;
let prioSum = 0;

rl.on("line", (line) => {
  let charCode = 0;
  let prio = 0;
  let foundBadge = "";

  lineCounter = lineCounter + 1;

  if (lineCounter % 3 === 0) {
    for (const char1 of line) {
      if (foundBadge) {
        break;
      }

      for (const char2 of lineAbove) {
        for (const char3 of lineAboveAbove) {
          if (char1 === char2 && char1 === char3) {
            foundBadge = char1;
            charCode = char1.charCodeAt(0);
          }
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
  }

  lineAboveAbove = lineAbove;
  lineAbove = line;
});

rl.on("close", () => {
  console.log(prioSum);
});
