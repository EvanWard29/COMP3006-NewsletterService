let express = require("express");
let path = require("path");
let http = require("http");

// Set up the server and app.
let app = express();
let server = http.createServer(app);

// Configure statics.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

server.listen(9000, function () {
    console.log("Listening on 9000");
})









