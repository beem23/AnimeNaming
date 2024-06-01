const axios = require('axios');
const path = require('path');
const fs = require('fs').promises; // Assuming you are using the promise-based API
require('dotenv').config();

const mainFolder = process.env.MAINFOLDER;
const rejectsFolder = process.env.REJECTSFOLDER;
const movieFolder = process.env.MOVIEFOLDER;

async function callMovieDB(movieName) {
    const refinedMovieName = movieName.replace(/ /g, "%20")
    try {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {query: refinedMovieName, include_adult: 'false', language: 'en-US', page: '1'},
            headers: {accept: 'application/json', Authorization: `Bearer ${process.env.MOVIE_API_KEY}`}
          };
          
        const response = await axios.request(options);
        if (response.data.results && response.data.results.length > 0) {
            const movie = response.data.results[0];
            return movie.release_date ? `(${movie.release_date.split('-')[0]})` : '';
        } else {
            return '';
        }
    } catch (error) {
        console.error(`Failed to fetch data from MovieDB for ${movieName}:`, error.message);
        return ''; // Return empty if there's an API error
    }
}

// Helper function to delay execution
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getMovieYear() {
    try {
        const files = await fs.readdir(movieFolder);
        for (let file of files) {
            const baseName = path.parse(file).name; // This might be needed to extract just the name without extension
            const movieYear = await callMovieDB(baseName);
            const newFileName = `${baseName} ${movieYear}${path.extname(file)}`; // Append year and retain original file extension
            const fullPath = path.join(movieFolder, file);
            const newFullPath = path.join(movieFolder, newFileName);
            await fs.rename(fullPath, newFullPath);
            console.log(`Renamed ${file} to ${newFileName}`);

            await delay(2000); // Wait for 2 seconds before continuing to the next file
        }
    } catch (error) {
        console.error("Error processing files in movie folder:", error);
    }
}



exports.getMovieYear = getMovieYear;