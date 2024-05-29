//Read all the file types within the main folder. 
//If its not .mkv or .mp4 then move it to a new folder called "Type Rejects".
//For the correct file types we will compile a list of all the current movies 
//and put them into a new string with their respective spaces and a set of symbols to designate the end 
//and or start of a new movie title since it is a long string.
//for an LLM to quickly analyze and return a list of the same file names but with no 
//movie year in the title and no filetype. Something that an easy search in a movie database can return the meta data for each file. 
//The LLM response should just be another string of the same movie titles but now fixed.
//LLM context:
//If the movie name received is: A Letter to Momo 2011.mkv
//The response should be: A Letter to Momo
//LLM context:
//Akira - 1988.mkv
//Akira
//LLM context:
//Angel Beats! OVA 01 - Stairway to Heaven.mkv
//Angel Beats! OVA 01 - Stairway to Heaven
//The LLM needs to return a list of the same Movie Titles with like #$% designating the next new movie refined title and like &&** to designate the next movie.
//Something easy to parse and create folders with the new movie titles and put the old titled file into. Each movie should have its own movie folder with the new name
//and file within it.
//For example the Akira - 1988.mkv files folder should be Akira.



//Once this is done.
//The main folder should consist of nothing but a bunch of folders with movies in each folder.

//Now after all this is done we need to one by one read each of the folders names and check with a movie database for the meta data and get the year that the movie came out.
//Once we have that we change the folder name to add a space and the movie release year in parenthesis.
//For example: 
//Akira
//Akira (1988)
// We must be able to maneuver through the response of the movie database.

const fs = require('fs');
const path = require('path');
const { queryGPT35Turbo } = require('./ai.js');
async function runQuery() {
    const prompt = "Explain the significance of quantum computing.";
    try {
        const responseText = await queryGPT35Turbo(prompt);
        console.log('Response from OpenAI:', responseText);
    } catch (error) {
        console.error('Error querying OpenAI:', error);
    }
}

runQuery();

// Use double backslashes in the path for Windows
// const mainFolder = 'C:\\Users\\bello\\OneDrive\\Desktop\\Testing';
// const rejectsFolder = 'C:\\Users\\bello\\OneDrive\\Desktop\\Type Rejects';
// if (!fs.existsSync(rejectsFolder)) {
//     fs.mkdirSync(rejectsFolder, { recursive: true });
// }
// const movieFolder = 'C:\\Users\\bello\\OneDrive\\Desktop\\Movies';
// if (!fs.existsSync(movieFolder)) {
//     fs.mkdirSync(movieFolder, { recursive: true });
// }
// const movieList = 'C:\\Users\\bello\\OneDrive\\Desktop\\Movies\\movies.txt';

// // Read all the files in the main folder
// fs.readdir(mainFolder, (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     files.forEach(file => {
//         const fullPath = path.join(mainFolder, file);
//         console.log(fullPath);
//         if (path.extname(file).toLowerCase() === '.mkv' || path.extname(file).toLowerCase() === '.mp4') {
//             const destinationPath = path.join(movieFolder, 'movies.txt');
//             // Compile a list of all the current movies
//             fs.appendFile(destinationPath, file + ' #$% ', (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         } else {
//             // Move the file to the rejects folder
//             const destinationPath = path.join(rejectsFolder, file);
//             fs.rename(fullPath, destinationPath, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         }
//     });
// });
