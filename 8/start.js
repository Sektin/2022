const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const containsNumbersGreaterThan = (number, array) => {
  let hasGreaterNumber = false;
  array.forEach((n) => {
    if (n > number) {
      hasGreaterNumber = true;
    }
  });
  return hasGreaterNumber;
};

const getScenicScore = (number, prevArrays, postArrays) => {
  const scores = [];
  prevArrays.forEach((array) => {
    let score = 0;
    for (i = array.length - 1; i >= 0; i--) {
      score = score + 1;
      if (array[i] >= number) {
        break;
      }
    }
    if (score > 0) {
      scores.push(score);
    }
  });

  postArrays.forEach((array) => {
    let score = 0;
    for (i = 0; i < array.length; i++) {
      score = score + 1;
      if (array[i] >= number) {
        break;
      }
    }
    if (score > 0) {
      scores.push(score);
    }
  });
  return scores.reduce((a, b) => a * b);
};

const getPrevPostYArrays = (matrix, rowIndex, numberIndex) => {
  const prevArrayY = [];
  const postArrayY = [];
  matrix.forEach((row, rowIndex2) => {
    if (rowIndex2 < rowIndex) {
      prevArrayY.push(row[numberIndex]);
    }

    if (rowIndex2 > rowIndex) {
      postArrayY.push(row[numberIndex]);
    }
  });

  return [prevArrayY, postArrayY];
};

const matrix = [];
let counter = 0;

rl.on("line", (line) => {
  const numbers = [...line].map((strNumber) => parseInt(strNumber));
  matrix.push(numbers);
});

rl.on("close", () => {
  let bestScenicScore = 0;
  matrix.forEach((row, rowIndex) => {
    row.forEach((number, numberIndex) => {
      const prevArrayX = row.slice(0, numberIndex);
      const postArrayX = row.slice(numberIndex + 1);
      const [prevArrayY, postArrayY] = getPrevPostYArrays(
        matrix,
        rowIndex,
        numberIndex
      );
      const isAtEdge =
        rowIndex === 0 ||
        numberIndex === 0 ||
        numberIndex === row.length - 1 ||
        rowIndex === matrix.length - 1;

      if (isAtEdge) {
        counter = counter + 1;
      }

      if (!isAtEdge) {
        const prevHasNumber = containsNumbersGreaterThan(
          number - 1,
          prevArrayX
        );
        const postHasNumber = containsNumbersGreaterThan(
          number - 1,
          postArrayX
        );
        const isVisibleInX = !prevHasNumber || !postHasNumber;
        if (isVisibleInX) {
          counter = counter + 1;
        }

        if (!isVisibleInX) {
          const prevArrayHasNumber = containsNumbersGreaterThan(
            number - 1,
            prevArrayY
          );
          const postArrayHasNumber = containsNumbersGreaterThan(
            number - 1,
            postArrayY
          );
          const isVisibleInY = !prevArrayHasNumber || !postArrayHasNumber;

          if (isVisibleInY) {
            counter = counter + 1;
          }
        }
      }
      const scenicScore = getScenicScore(
        number,
        [prevArrayX, prevArrayY],
        [postArrayX, postArrayY]
      );

      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    });
  });
  console.log(`Amount of visible trees: ${counter}`);
  console.log(`Highest scenic score: ${bestScenicScore}`);
});
