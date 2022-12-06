const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const resultAmount = 3;
const allCalories = [];
let currentCalories = 0;
let result = { sum: 0 };

rl.on("line", (line) => {
  const calories = parseInt(line, 10);

  if (calories) {
    currentCalories = currentCalories + calories;
  }

  if (!calories) {
    allCalories.push(currentCalories);
    currentCalories = 0;
  }
});

rl.on("close", () => {
  for (let i = 0; i < resultAmount; i++) {
    result[i] = {
      calories: 0,
      index: 0,
    };

    allCalories.forEach((calories, index) => {
      if (calories > result[i].calories) {
        result[i].calories = calories;
        result[i].index = index;
      }
    });

    allCalories.splice(result[i].index, 1);

    result.sum = result.sum + result[i].calories;
  }

  console.log(result);
});
