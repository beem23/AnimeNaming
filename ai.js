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
    + " &&** is used to designate the next movie. #$% is used to designate the last movie's refined title."
    + " Example input of List: A Letter to Momo 2011.mkv &&** Akira - 1988.mkv &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv" 
    + " The refined version should be like: A Letter to Momo 2011.mkv #$% A Letter to Momo &&** Akira - 1988.mkv #$% Akira &&** Angel Beats! OVA 01 - Stairway to Heaven.mkv #$% Angel Beats! OVA 01 - Stairway to Heaven"
    + " The unrefined movie titles are as follows:" + movies
    + " Please refine the movie titles. And please DO NOT USE line breaks in the response. And make sure the response is in the same order as the input. AND PLEASE make sure the response has no extra spaces or characters. except #$% and &&**.";
    console.log("Querying AI with content:", content);

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content }],
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        
        if (response.data.choices && response.data.choices.length > 0) {
            const refinedTitles = response.data.choices[0].message.content;
            console.log("Response from AI:", refinedTitles);
            return refinedTitles;
        } else {
            console.error("No data received from AI.");
            return '';
        }
    } catch (error) {
        console.error("Error querying OpenAI:", error.message);
        return '';
    }
}

module.exports = { queryGPT35Turbo };
