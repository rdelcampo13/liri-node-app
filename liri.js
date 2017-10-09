
var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});


var appArg = process.argv[2];

switch (appArg) {
  case 'my-tweets':
    var params = {screen_name: 'rudy1010101010'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log('');
        console.log('---------- My Latest Tweets ----------');
        for (var i = 0; i < tweets.length; i++) {
          console.log('');
          console.log('Name:', tweets[i].user.name);
          console.log('Username:', tweets[i].user.screen_name);
          console.log('Tweet:', tweets[i].text);
          console.log('');
        };
        console.log('---------------------------------------');
        console.log('');
      }
    });
    break;

  case 'spotify-this-song':

    var spotify = new Spotify({
      id: '56a9265e57ce4b44b44b21ec491fd76a',
      secret: '161cc27f38634bd8822bfa40740ed089'
    });
    var arguments = process.argv;
    var songTitle = '';

    if (arguments.length < 4) {

      songTitle = 'The Sign Ace of Base';

    } else {

      for (var i = 3; i < arguments.length; i++) {
        songTitle += arguments[i] + ' ';
      };

    }

    spotify.search({ type: 'track', query: songTitle.trim() }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      // console.log(JSON.stringify(data, null, 2));
      console.log('');
      console.log('---------- Spotify Song Data ----------');
      console.log('');
      console.log('Artist(s):', data.tracks.items[0].artists[0].name);
      console.log('Title:', data.tracks.items[0].name);
      console.log('Preview:', data.tracks.items[0].external_urls.spotify);
      console.log('Album:', data.tracks.items[0].album.name);
      console.log('');
      console.log('----------------------------------------');
      console.log('');
    });

    break;

  case 'movie-this':

    var arguments = process.argv;
    var movieTitle = '';

    if (arguments.length < 4) {

      movieTitle = 'Mr. Nobody';

    } else {

      for (var i = 3; i < arguments.length; i++) {
        movieTitle += arguments[i] + ' ';
      };

    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle.trim() + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
      // If the request was successful...
      if (!error && response.statusCode === 200) {

        // Then log the Release Year for the movie
        // ...
        console.log('');
        console.log('---------- OMDB Movie Data ----------');
        console.log('');
        console.log('Movie Title:', JSON.parse(body).Title);
        console.log('Release Year:', JSON.parse(body).Year);
        console.log('IMDB Rating:', JSON.parse(body).imdbRating);
        console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
        console.log('Country:', JSON.parse(body).Country);
        console.log('Language:', JSON.parse(body).Language);
        console.log('Plot:', JSON.parse(body).Plot);
        console.log('Actors:', JSON.parse(body).Actors);
        console.log('');
        console.log('----------------------------------------');
        console.log('');
      }
    });


    break;

  case 'do-what-it-says':
    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }

      var dataArr = data.split(",");

      switch (dataArr[0]) {
        case 'my-tweets':
          var params = {screen_name: 'rudy1010101010'};
          client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
              console.log('');
              console.log('---------- My Latest Tweets ----------');
              for (var i = 0; i < tweets.length; i++) {
                console.log('');
                console.log('Name:', tweets[i].user.name);
                console.log('Username:', tweets[i].user.screen_name);
                console.log('Tweet:', tweets[i].text);
                console.log('');
              };
              console.log('---------------------------------------');
              console.log('');
            }
          });
          break;

        case 'spotify-this-song':

          var spotify = new Spotify({
            id: '56a9265e57ce4b44b44b21ec491fd76a',
            secret: '161cc27f38634bd8822bfa40740ed089'
          });
          var songTitle = dataArr[1];

          spotify.search({ type: 'track', query: songTitle.trim() }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }

            // console.log(JSON.stringify(data, null, 2));
            console.log('');
            console.log('---------- Spotify Song Data ----------');
            console.log('');
            console.log('Artist(s):', data.tracks.items[0].artists[0].name);
            console.log('Title:', data.tracks.items[0].name);
            console.log('Preview:', data.tracks.items[0].external_urls.spotify);
            console.log('Album:', data.tracks.items[0].album.name);
            console.log('');
            console.log('----------------------------------------');
            console.log('');
          });

          break;

        case 'movie-this':

          var movieTitle = dataArr[1];

          var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle.trim() + "&y=&plot=short&apikey=40e9cece";

          request(queryUrl, function(error, response, body) {
            // If the request was successful...
            if (!error && response.statusCode === 200) {

              // Then log the Release Year for the movie
              // ...
              console.log('');
              console.log('---------- OMDB Movie Data ----------');
              console.log('');
              console.log('Movie Title:', JSON.parse(body).Title);
              console.log('Release Year:', JSON.parse(body).Year);
              console.log('IMDB Rating:', JSON.parse(body).imdbRating);
              console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
              console.log('Country:', JSON.parse(body).Country);
              console.log('Language:', JSON.parse(body).Language);
              console.log('Plot:', JSON.parse(body).Plot);
              console.log('Actors:', JSON.parse(body).Actors);
              console.log('');
              console.log('----------------------------------------');
              console.log('');
            }
          });


          break;

      };

    });

    break;

  default:
    console.log("Sorry, I don't understand.");
};