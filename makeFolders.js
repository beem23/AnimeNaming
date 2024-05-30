//In this script we will recieve a set of key value pairs.
//We will create a folder for each pair.
//The value of the key will be the name of the folder.
//The key is how we will search for the file to move to the folder.

const fs = require("fs");
const path = require("path");

const mainFolder = "C:\\Users\\bello\\OneDrive\\Desktop\\Testing";
const movieFolder = "C:\\Users\\bello\\OneDrive\\Desktop\\Movies";

//read through the main folder and create folders in the moviesFolder for each key value pair
