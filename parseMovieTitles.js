function parseMovieTitles(inputString) {
    console.log("Input String from inside parsing function:", inputString);

    if (!inputString) {
        console.error('Invalid input: inputString is undefined or null.');
        return {};
    }

    const movieMap = {};
    const movies = inputString.split(' &&** ');
    console.log("Movies array after split by '&&**':", movies);

    movies.forEach(movie => {
        console.log("Current movie string:", movie);
        if (movie) {
            const parts = movie.split(' #$% ');
            console.log("Parts after split by '#$%':", parts);
            if (parts.length === 2) {
                const originalName = parts[0].trim();
                const refinedName = parts[1].trim();
                movieMap[originalName] = refinedName;
            } else {
                console.log("Splitting by '#$%' did not produce expected parts:", parts);
            }
        }
    });

    console.log("Final movieMap:", movieMap);
    return movieMap;
}



module.exports = { parseMovieTitles };

// Example usage
// const inputString = "A Letter to Momo 2011.mkv #$% A Letter to Momo &&** Akira - 1988.mkv #$% Akira &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv #$% Angel Beats! OVA 01 - Stairway to Heaven";
// const movieTitlesMap = parseMovieTitles(inputString);
// console.log(movieTitlesMap);
