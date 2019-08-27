/*
A simple server.

@Author: Carlos Carrasquillo
@Project: Bootcamp Assignment #1
@Course: CEN3031 Intoduction to Software Engineering
@Instructor: Dr. Christina Gardner-McCune
@Date: Auguat 26, 2019, 12:00:00PM
@Semester: Fall 2019
*/

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  /*
    The request handler sends listingData in the JSON format as a response if a
    'GET' request is sent to the '/listings' path. Otherwise, it sends a 404
    error.
  */
  var parsedUrl = url.parse(request.url);         // parses URL into components
  // if the request is a 'GET' request AND it is sent to the '/listings' path...
  if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
    // send OK code and the listingData in the JSON format as a response
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(listingData);
  }
  else {
    // send an error code and plain text error message as a response
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function saves the data in the listingData variable,
    then start the server.
  */
  if (err) {
    throw err;        // throws error if there is an error
  }

  listingData = data; //saves the data in the listingData variable
  // creates, but does not start, a server
  var server = http.createServer(requestHandler);
  // starts the server, listening for requests on port 8080
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('server listening on: http://localhost:' + port);
  });
});
