const fs = require("fs");

try {
  const data = fs.readFileSync("input.txt", "utf8");

  for (let i = 0; i < data.length; i++) {
    let counter = 0;
    const chunk = data.substring(i, i + 4);

    for (const char of [...chunk]) {
      const regEx = new RegExp(char, "g");
      const amount = chunk.match(regEx).length;
      if (amount === 1) {
        counter = counter + 1;
      }
    }

    if (counter === 4) {
      console.log(`marker "${chunk}" ends at index ${i + 4}`);
      break;
    }
  }
} catch (err) {
  console.error(err);
}
