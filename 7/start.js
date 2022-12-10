const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const folderName = "slash";
let isListing = false;
let currentDirectory = "";
let fileSizeCounter = 0;
const dirSizes = {};

const changeDirectory = (line) => {
  const directory = line.substring(5);
  switch (directory) {
    case "/":
      currentDirectory = folderName;
      break;
    case "..":
      const lastSlashIndex = currentDirectory.lastIndexOf("/");
      currentDirectory = currentDirectory.substring(0, lastSlashIndex);
      break;
    default:
      currentDirectory = currentDirectory + "/" + directory;
      break;
  }
};

const addToFileSizeCounter = (line) => {
  const size = line.split(" ")[0];
  fileSizeCounter = fileSizeCounter + parseInt(size);
};

const addToDirSizes = () => {
  const dirNames = currentDirectory.split("/");

  dirNames.forEach((dir, index) => {
    const prevDir = dirNames.slice(0, index).join("/");
    const newDir = prevDir ? prevDir + "/" + dir : dir;
    if (!(newDir in dirSizes)) {
      dirSizes[newDir] = 0;
    }
    dirSizes[newDir] = dirSizes[newDir] + fileSizeCounter;
  });
  fileSizeCounter = 0;
};

const getTotalSumOfDirsUnderSize = (size) => {
  let totalValue = 0;
  for (const [key, value] of Object.entries(dirSizes)) {
    if (value < size && value > 0) {
      totalValue = totalValue + value;
    }
  }
  return totalValue;
};

const getDirToDelete = () => {
  const totalDiskSpace = 70000000;
  const neededSize = 30000000 - (totalDiskSpace - dirSizes[folderName]);
  let closestDirSize = totalDiskSpace;
  let dirPath = "";

  for (const [key, value] of Object.entries(dirSizes)) {
    if (value >= neededSize) {
      if (value < closestDirSize) {
        closestDirSize = value;
        dirPath = key;
      }
    }
  }
  return { closestDirSize, dirPath };
};

const isCd = (line) => {
  return line.startsWith("$ cd");
};

const isFile = (line) => {
  return parseInt(line.charAt(0)) > -1;
};

const isCommand = (line) => {
  return line.startsWith("$");
};

const isListCommand = (line) => {
  return line.startsWith("$ ls");
};

rl.on("line", (line) => {
  if (isCommand(line)) {
    isListing = false;
  }

  if (isListCommand(line)) {
    isListing = true;
  }

  if (isListing) {
    if (isFile(line)) {
      addToFileSizeCounter(line);
    }
  }

  if (!isListing && line !== "$ cd /") {
    if (!(currentDirectory in dirSizes)) {
      addToDirSizes();
    }
  }

  if (isCd(line)) {
    changeDirectory(line);
  }
});

rl.on("close", () => {
  if (fileSizeCounter > 0) {
    if (!(currentDirectory in dirSizes)) {
      addToDirSizes();
    }
  }

  const sum = getTotalSumOfDirsUnderSize(100001);
  console.log(sum);
  const dir = getDirToDelete();
  console.log(dir);
});
