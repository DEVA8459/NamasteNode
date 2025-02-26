// creating server

const http = require("node:http");
const server = http.createServer(function (req, res) {
    if (req.url === "/secret") {
        res.end("no secret data");
      }
  res.end("Hello World");
 
});

server.listen(222);

//start your server in terminal
// node Server.js
//open your browser and type http://localhost:222/ and see the output
//this is low level server
//butif we are using big app we dont use http we use express
