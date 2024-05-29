//Here the AI is implemented from openai GPT-3.5 Turbo
//The script will take in a string and return a string ergo the response from the AI will be a string.
//The response will be the same movie titles but now fixed.
//The LLM context:
//If the movie name received is: A Letter to Momo 2011.mkv
//The response should be: A Letter to Momo
//The LLM context:
//Akira - 1988.mkv
//Akira
//How the string being passed should look like:
//A Letter to Momo 2011.mkv &&** Akira - 1988.mkv &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv
//The response should be:
//A Letter to Momo 2011.mkv #$% A Letter to Momo &&** Akira - 1988.mkv #$% Akira &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv #$% Angel Beats! OVA 01 - Stairway to Heaven
//The LLM needs to return a list of the same Movie Titles with like #$% designating the next new movie refined title and like &&** to designate the next movie.
//Something easy to parse and create folders with the new movie titles and put the old titled file into. Each movie should have its own movie folder with the new name
//and file within it.
//For example the Akira - 1988.mkv files folder should be Akira.
//

const { OpenAI } = require('openai');
require('dotenv').config();
const axios = require('axios');

async function queryGPT35Turbo(movies) {
    const content = "You are an Anime Movie file renaming AI. You will be given a list of movie titles that need to be refined a.k.a renamed." 
    + " The LLM response should just ONLY be another string of the same movie titles but now fixed. AND NOTHING ELSE."
    + " Example: If the movie name received is: A Letter to Momo 2011.mkv"
    + " The refined version should be: A Letter to Momo"
    + " Example: Akira - 1988.mkv"
    + " The refined version should be: Akira"
    + " &&** is used to designate the next movie. #$% is used to designate the next new movie refined title."
    + " Example input of List: A Letter to Momo 2011.mkv &&** Akira - 1988.mkv &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv" 
    + " The refined version should be like: A Letter to Momo 2011.mkv #$% A Letter to Momo &&** Akira - 1988.mkv #$% Akira &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv #$% Angel Beats! OVA 01 - Stairway to Heaven";
    + " The unrefined movie titles are as follows:" + movies
    + " Please refine the movie titles."
    console.log(movies  + " are the movie titles")
    const url = "https://api.openai.com/v1/chat/completions";
    const payload = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: content
        }],
        temperature: 0.7
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        console.log(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error querying OpenAI:', error.message);
    }
}

module.exports = { queryGPT35Turbo };
