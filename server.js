//Imports
let express = require("express");
let path = require("path");
let http = require("http");
let bodyParser = require("body-parser")
let routes = require("./js/routes/routes.js");
let socketIo = require("socket.io");

// Setup the Server and App.
let app = express();
let server = http.createServer(app);

// Setup Database Connection
let mongoose = require("mongoose");
let url = "mongodb+srv://Evan:sZ1bzcn0sSOTgdT5@cluster0.s9yta.mongodb.net/newsletter?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

//Connection Handling
mongoose.connection.on('error', function () { console.log("Error Connecting to DB") });
mongoose.connection.on('disconnected', function () { console.log("Disconnected From DB") });
mongoose.connection.on('connected', function () {
    //console.log("Connected to DB: " + mongoose.connection.db.databaseName);
});

//POST Form Processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the websocket.
let io = socketIo(server);

io.on("connection", function (socket) {
    socket.on("send message", function (msg) {
        socket.broadcast.emit("received message", msg);
    });
});

//View Engine Configuration
app.set("views", path.join(__dirname, "js/views"));
app.set("view engine", "ejs");

//Statics
app.use(express.static(path.join(__dirname, "newsletters")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

//User Routes
app.post("/api/getUsers", routes.getAllUsers);
app.post("/api/getUserDetails", routes.getUserDetails);

app.post("/api/changeEmail", routes.changeEmail);
app.post("/api/changePassword", routes.changePassword);
app.post("/api/deleteAccount", routes.deleteAccount);

//Admin Routes
app.post("/api/getAdmins", routes.getAdmins);
app.post("/api/adminActive", routes.adminActive);

//Topic Routes
app.post("/api/getTopics", routes.getAllTopics);
app.post("/api/addTopic", routes.addTopic);

//Subscription Routes
app.post("/api/getSubscriptions", routes.getAllSubscriptions); /* REMOVE */

//Newsletter Routes
app.post("/api/getNewsletters", routes.getNewsletters);
app.post("/api/moveFile", routes.moveFile);
app.post("/api/uploadNewsletter", routes.uploadNewsletters);

//Login/Register Routes
app.post("/api/register", routes.registerUser);
app.post("/api/login", routes.loginUser);
app.post("/api/logout", routes.logoutUser);

app.get("/main", routes.listAllTopics);

app.get("/account", routes.account);

app.get("/login", function (request, response) {
    response.render("login");
})

app.get("/registration", function (request, response) {
    response.render("registration");
})

module.exports.app = app;

server.listen(9000, function () {
    console.log("Listening on 9000");
})








