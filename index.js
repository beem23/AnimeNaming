const fs = require("fs").promises; // Use fs.promises for all FS operations
const path = require("path");
require("dotenv").config();
const { queryGPT35Turbo } = require("./ai.js");
const { parseMovieTitles } = require("./parseMovieTitles.js");
const { makeFolders } = require("./makeFolders.js");
const { getMovieYear } = require("./movieAPI.js");

const mainFolder = process.env.MAINFOLDER;
const rejectsFolder = process.env.REJECTSFOLDER;
const movieFolder = process.env.MOVIEFOLDER;

// Check and create folders if they don't exist
async function ensureFoldersExist() {
    if (!mainFolder || !rejectsFolder || !movieFolder) {
        console.error("One or more environment variables are undefined. Check your .env file.");
        return; // Exit the function early if paths are not set
    }
    try {
        await fs.mkdir(rejectsFolder, { recursive: true });
        await fs.mkdir(movieFolder, { recursive: true });
    } catch (error) {
        console.error("Failed to ensure folders exist:", error);
    }
}


let movieTitles = [];

const BATCH_SIZE = 10; // Adjust the batch size as needed

async function processMovies() {
    let allRefinedTitles = []; // Array to collect refined titles from all batches

    try {
        // Process the movie titles in batches
        for (let i = 0; i < movieTitles.length; i += BATCH_SIZE) {
            // Get the current batch of titles
            const batch = movieTitles.slice(i, i + BATCH_SIZE);
            const titlesString = batch.join(" &&** ");
            const aiResponse = await queryGPT35Turbo(titlesString);

            if (!aiResponse) {
                console.log("AI did not return a valid response for batch starting at index", i);
                continue; // Skip to next batch if AI response is invalid
            }

            const refinedNames = parseMovieTitles(aiResponse);
            console.log(`Refined Movie Titles for batch starting at index ${i}:`, refinedNames);

            await makeFolders(refinedNames); // Assuming makeFolders can handle a list of names
            allRefinedTitles = allRefinedTitles.concat(refinedNames);
        }

        // After all batches are processed, call getMovieYear for all refined titles at once
        if (allRefinedTitles.length > 0) {
            await getMovieYear(allRefinedTitles); // Ensure this function can handle all refined titles
        } else {
            console.log("No valid movie titles to process for years.");
        }
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


