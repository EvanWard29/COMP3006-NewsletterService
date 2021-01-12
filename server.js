//Imports
let express = require("express");
let path = require("path");
let http = require("http");
let bodyParser = require("body-parser")
let socketIo = require("socket.io");

//Routes
let newsletter = require("./js/routes/newsletter.js");
let user = require("./js/routes/user.js");
let topic = require("./js/routes/topic.js");

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
app.post("/api/getUsers", user.getAllUsers);
app.post("/api/getUserDetails", user.getUserDetails);

app.post("/api/changeEmail", user.changeEmail);
app.post("/api/changePassword", user.changePassword);
app.post("/api/deleteAccount", user.deleteAccount);

//Admin Routes
app.post("/api/getAdmins", user.getAdmins);
app.post("/api/adminActive", user.adminActive);

//Topic Routes
app.post("/api/getTopics", topic.getAllTopics);
app.post("/api/addTopic", topic.addTopic);

//Newsletter Routes
app.post("/api/getNewsletters", newsletter.getNewsletters);
app.post("/api/moveFile", newsletter.moveFile);
app.post("/api/uploadNewsletter", newsletter.uploadNewsletters);

//Login/Register Routes
app.post("/api/register", user.registerUser);
app.post("/api/login", user.loginUser);
app.post("/api/logout", user.logoutUser);

app.get("/main", topic.listAllTopics);

app.get("/account", user.account);

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