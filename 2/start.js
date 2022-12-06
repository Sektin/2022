const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

// Opponent          Me
// A = Rock      ||  X = Rock     ||  1 Point
// B = Paper     ||  Y = Paper    ||  2 Points
// C = Scissors  ||  Z = Scissory ||  3 Points

// Loss = 0
// Draw = 3
// Win = 6

let totalScore = 0;

rl.on("line", (line) => {
  const opponent = line.substring(0, 1);
  const me = line.substring(2);

  switch (opponent) {
    case "A":
      if (me === "X") {
        totalScore = totalScore + 4;
      }

      if (me === "Y") {
        totalScore = totalScore + 8;
      }

      if (me === "Z") {
        totalScore = totalScore + 3;
      }
      break;

    case "B":
      if (me === "X") {
        totalScore = totalScore + 1;
      }

      if (me === "Y") {
        totalScore = totalScore + 5;
      }

      if (me === "Z") {
        totalScore = totalScore + 9;
      }
      break;

    case "C":
      if (me === "X") {
        totalScore = totalScore + 7;
      }

      if (me === "Y") {
        totalScore = totalScore + 2;
      }

      if (me === "Z") {
        totalScore = totalScore + 6;
      }
      break;

    default:
      break;
  }
});

rl.on("close", () => {
  console.log(totalScore);
});
