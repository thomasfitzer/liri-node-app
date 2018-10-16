// https://www.npmjs.com/ USE THIS TO FIND THE NPMS
var keys = require("./keys");
require("dotenv").config();
console.log(keys);












var request = require('request');
//Sets up the user input for the function they want and the content they seek.
var userInput = process.argv[2];
var ask = process.argv[3];
//This function, in theory, would have allowed a user to find song info.
var spotifySong = function(trackInput) {
    var spotify = require('spotify-web-api-node');

    if (trackInput === undefined) {
        trackInput = "the sign ace of base";
    }
    spotify.search({type: 'track', query: trackInput}, function(error, data){
        //This was the main problem I had, I just couldn't figure out what the
        //hell I did wrong.
        if(error) {
            console.log("Error Occurence: " + error);
        } else {
            for(var i =0; i<data.tracks.items[0].artists.length; i++) {
                if (i === 0) {
                    console.log("Artist(s): " + data.tracks.items[0].artists[i].name);
                } else {
                    console.log("  " + data.tracks.items[0].artists[i].name)
                }
            }
            //This logs the song info.
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });
}
 
//This would find movie info, you know, if it worked.
var omdbMovie = function(movieInput) {
    var omdb = require("omdb");
    console.log(omdb);

    if(movieInput === undefined) {
        movieInput = "mr nobody";
    }
    //Here is the address used to request the info.
    request("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json", function(error, body){
        if(error) {
            console.log("Error Occurence: " + error); 
        } else {
            for (var i = 0; i < movieInput.length; i++){
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Cast: " + JSON.parse(body).Actors);
                
                
            }
        }
  });
}


//You could find out where you're favorite band is playing. As it is, you can't
var bandsInTown = function(bandInput) {
    var Events = require('bandsintown-events');
    if (bandInput === undefined) {
        bandInput = "Error Occurence: ";
    }
    request("https://rest.bandsintown.com/artists/" + bandInput + "/events?app_id=codingbootcamp", function(error){
        if(error) {
            console.log("Error Occurence: " + error);
        } else {
            for(var i = 0; i < Events.length; i++){
                console.log("City: " + Events[i].venue.city);
                console.log("Venue: " + Events[i].venue.name);
                console.log("Date: " + Events[i].datetime);
            
        }
    }
});
}

//This would have asked the user exactly what info they would have seeked.
if(userInput === "spotify-this-song") {
	spotifySong(ask);
} else if(userInput === "movie-this") {
	omdbMovie(ask);
} else if (userInput === "bandsintown-events") {
    bandsInTown(ask);
}
else if(userInput === "do-what-it-says") {
	
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(data) {
		var userInput;
		var ask;

		
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			userInput = dataArr[0];
			ask = dataArr[1];
		} else {
			userInput = data;
		}

		// After reading the command from the file, decides which app function to run
		if(userInput === "spotify-this-song") {
			spotifySong(ask);
		} else if(userInput === "movie-this") {
			omdbMovie(ask);
		} else if(userInput === "bandsintow-events") {
			bandsInTown(ask);
		} else { // Use case where the command is not recognized
			console.log("Command from file is not a valid command! Please try again.")
		}
	});
} else if(userInput === undefined) { // use case where no command is given
	console.log("Please enter a command to run LIRI.")
} else { // use case where command is given but not recognized
	console.log("Command not recognized! Please try again.")
}
    






// npm install spotify-web-api-node --save
// $ npm install omdb
// $ npm i bandsintown-events