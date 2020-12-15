//Imports
let express = require("express");
let path = require("path");
let http = require("http");
let bodyParser = require("body-parser")
let routes = require("./js/routes/routes.js");

// Setup the Server and App.
let app = express();
let server = http.createServer(app);

// Setup Database Connection
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/newsletter";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

//Connection Handling
mongoose.connection.on('error', function () { console.log("Error Connecting to DB") });
mongoose.connection.on('disconnected', function () { console.log("Disconnected From DB") });
mongoose.connection.on('connected', function () {
    console.log("Connected to DB: " + mongoose.connection.db.databaseName);
});


//POST Form Processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//View Engine Configuration
app.set("views", path.join(__dirname, "js/views"));
app.set("view engine", "ejs");

//Statics
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

//Routes
app.post("/api/getUsers", routes.getAllUsers);
app.post("/api/getTopics", routes.getAllTopics);
app.post("/api/getSubscriptions", routes.getAllSubscriptions);
app.post("/api/addTopic", routes.addTopic);

app.get("/main", routes.listAllTopics);

server.listen(9000, function () {
    console.log("Listening on 9000");
})








