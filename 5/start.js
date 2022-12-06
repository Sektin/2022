const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const stacks = [[], [], [], [], [], [], [], [], []];
let lineCounter = 1;

rl.on("line", (line) => {
  // get stacks
  if (lineCounter < 9) {
    const chars = [...line];

    chars.forEach((char, index) => {
      if (char.trim()) {
        switch (index) {
          case 1:
            stacks[0].push(char);
            break;
          case 5:
            stacks[1].push(char);
            break;
          case 9:
            stacks[2].push(char);
            break;
          case 13:
            stacks[3].push(char);
            break;
          case 17:
            stacks[4].push(char);
            break;
          case 21:
            stacks[5].push(char);
            break;
          case 25:
            stacks[6].push(char);
            break;
          case 29:
            stacks[7].push(char);
            break;
          case 33:
            stacks[8].push(char);
            break;
          default:
            break;
        }
      }
    });
  }

  // do moves
  if (lineCounter > 10) {
    let moves = [...line].filter((char) => new RegExp(/^\d+$/).test(char));

    moves = moves.map((char) => parseInt(char));

    let move = 0;
    let from = 0;
    let to = 0;

    if (moves.length === 4) {
      move = parseInt(moves[0] + "" + moves[1]);
      from = moves[2] - 1;
      to = moves[3] - 1;
    } else {
      move = moves[0];
      from = moves[1] - 1;
      to = moves[2] - 1;
    }

    for (let i = 0; i < move; i++) {
      if (stacks[from].length > 0) {
        const container = stacks[from].shift();
        stacks[to].unshift(container);
      } else {
        console.log(`error - empty stack on line ${lineCounter}`);
      }
    }
  }

  lineCounter = lineCounter + 1;
});

rl.on("close", () => {
  let result = "";
  stacks.forEach((stack) => {
    result = result + stack[0];
  });
  console.log(result);
});
