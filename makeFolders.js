//In this script we will recieve a set of key value pairs.
//We will create a folder for each pair.
//The value of the key will be the name of the folder.
//The key is how we will search for the file to move to the folder.

const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const mainFolder = process.env.MAINFOLDER;
const movieFolder = process.env.MOVIEFOLDER;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//read through the main folder and create folders in the moviesFolder for each key value pair
async function makeFolders(kvPairs) {
    try {
        // Iterate over each key-value pair
        for (const [originalFile, newFolderName] of Object.entries(kvPairs)) {
            const folderPath = path.join(movieFolder, newFolderName);

            // Create a folder named after the value
            await fs.mkdir(folderPath, { recursive: true });

            // Build the full original file path and the new file path
            const originalFilePath = path.join(mainFolder, originalFile);
            const newFilePath = path.join(folderPath, originalFile);

            // Move the file from the original location to the new location
            try {
                await fs.rename(originalFilePath, newFilePath);
                console.log(`Moved ${originalFile} to ${folderPath}`);
                await delay(5000); // Wait for 2 seconds before moving the next file
            } catch (error) {
                console.error(`Error moving file ${originalFile}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error creating folders:', error.message);
    }
}

module.exports = { makeFolders };