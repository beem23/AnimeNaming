function parseMovieTitles(inputString) {
    // Initialize an empty object to hold our key-value pairs
    const movieMap = {};

    // Split the string into chunks based on the ' &&** ' delimiter
    const movies = inputString.split(' &&** ');

    // Process each chunk to extract the original and refined names
    movies.forEach(movie => {
        if (movie) {
            // Split each chunk into the original name and refined name using the ' #$% ' delimiter
            const parts = movie.split(' #$% ');
            if (parts.length === 2) {
                const originalName = parts[0].trim();
                const refinedName = parts[1].trim();
                // Assign the original name as key and refined name as value in the map
                movieMap[originalName] = refinedName;
            }
        }
    });

    return movieMap;
}

module.exports = { parseMovieTitles };

// Example usage
// const inputString = "A Letter to Momo 2011.mkv #$% A Letter to Momo &&** Akira - 1988.mkv #$% Akira &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv #$% Angel Beats! OVA 01 - Stairway to Heaven";
// const movieTitlesMap = parseMovieTitles(inputString);
// console.log(movieTitlesMap);
