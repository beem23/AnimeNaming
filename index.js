const fs = require("fs").promises; // Use fs.promises for all FS operations
const path = require("path");
require("dotenv").config();
const { queryGPT35Turbo } = require("./ai.js");
const { parseMovieTitles } = require("./parseMovieTitles.js");
const { makeFolders } = require("./makeFolders.js");
const { getMovieYear } = require("./movieAPI.js");

const mainFolder = process.env.MAIN_FOLDER;
const rejectsFolder = process.env.REJECTS_FOLDER;
const movieFolder = process.env.MOVIE_FOLDER;

// Check and create folders if they don't exist
async function ensureFoldersExist() {
    try {
        await fs.mkdir(rejectsFolder, { recursive: true });
        await fs.mkdir(movieFolder, { recursive: true });
    } catch (error) {
        console.error("Failed to ensure folders exist:", error);
    }
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
        await makeFolders(refinedNames);
        await getMovieYear();
    } catch (error) {
        console.error("Failed processing movies:", error);
    }
}

async function handleFiles() {
    try {
        await ensureFoldersExist(); // Ensure folders are created before proceeding
        const files = await fs.readdir(mainFolder);
        for (let file of files) {
            const fullPath = path.join(mainFolder, file);
            if ([".mkv", ".mp4"].includes(path.extname(file).toLowerCase())) {
                movieTitles.push(file);
            } else {
                const rejectPath = path.join(rejectsFolder, file);
                await fs.rename(fullPath, rejectPath);
            }
        }
        await processMovies();
    } catch (error) {
        console.error("Error processing directory:", error);
    }
}

handleFiles();


