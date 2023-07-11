const fs = require("fs");
const path = require("path");

const videoFilePath = "./Videos";

fs.readdir(videoFilePath, (err, files) => {
  if (err) {
    console.log("Error reading video folder", err);
    return;
  }

  const videoFiles = files.filter((files) => {
    const extension = path.extname(files).toLowerCase();
    return [".mp4", ".mov", ".avi"].includes(extension);
  });

  const randomiseFiles = shuffleArray(videoFiles);

  randomiseFiles.forEach((file, index) => {
    const extension = path.extname(file);
    const newFileName = `${index + 1}${extension}`;
    const oldFilePath = path.join(videoFilePath, file);

    let suffix = 1;
    let finalNewFileName = newFileName;
    while (fs.existsSync(path.join(videoFilePath, finalNewFileName))) {
      finalNewFileName = `${index + 1}_${suffix}${extension}`;
      suffix++;
    }

    fs.renameSync(oldFilePath, path.join(videoFilePath, finalNewFileName));
  });
  console.log("videos randomised and renamed!");
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
