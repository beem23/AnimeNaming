const fs = require("fs");
const path = require("path");
const { queryGPT35Turbo } = require("./ai.js");
const { parseMovieTitles } = require("./parseMovieTitles.js");

const mainFolder = "C:\\Users\\bello\\OneDrive\\Desktop\\Testing";
const rejectsFolder = "C:\\Users\\bello\\OneDrive\\Desktop\\Type Rejects";
const movieFolder = "C:\\Users\\bello\\OneDrive\\Desktop\\Movies";

// Ensure folders exist
if (!fs.existsSync(rejectsFolder)) {
  fs.mkdirSync(rejectsFolder, { recursive: true });
}
if (!fs.existsSync(movieFolder)) {
  fs.mkdirSync(movieFolder, { recursive: true });
}

let movieTitles = [];

async function processMovies() {
  try {
    const titlesString = movieTitles.join(" &&** ");
    const aiResponse = await queryGPT35Turbo(titlesString);
    if (!aiResponse) {
      console.log("AI did not return a valid response.");
      return;
    }
    const refinedNames = parseMovieTitles(aiResponse);
    console.log("Refined Movie Titles:", refinedNames);
  } catch (error) {
    console.error("Failed processing movies:", error);
  }
}

// Read and process files
async function handleFiles() {
  try {
    const files = await fs.promises.readdir(mainFolder);
    for (let file of files) {
      const fullPath = path.join(mainFolder, file);
      if ([".mkv", ".mp4"].includes(path.extname(file).toLowerCase())) {
        movieTitles.push(file);
      } else {
        const rejectPath = path.join(rejectsFolder, file);
        await fs.promises.rename(fullPath, rejectPath);
      }
    }
    await processMovies();
  } catch (error) {
    console.error("Error processing directory:", error);
  }
}

handleFiles();

