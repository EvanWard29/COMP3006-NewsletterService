let db = require("../collections/db.js");
let fs = require('fs');
let multer = require('multer');
let path = require("path");

async function listAllTopics(request, response) {
    let topics = await db.getTopics();
    let newsletters = await db.getNewsletters();

    let data = {
        topics: topics,
        newsletters: newsletters
    };

    response.render("main", data);
}

async function getAllTopics(request, response) {
    let topics = await db.getTopics();
    let data = { topics: topics };

    response.send(data);
}

async function addTopic(request, response) {
    //Check if Topic Already Exists
    await db.addTopic(request.body.topicID, request.body.topicName, request.body.topicDescription);
    //AJAX Create Folder For New Topic
}

async function getAllUsers(request, response) {
    let users = await db.getUsers();
    let data = { users: users };

    response.send(data);
}

async function getAllSubscriptions(request, response) {
    let subs = await db.getSubscriptions();
    let data = { subscriptions: subs };

    response.send(data);
}

async function getNewsletters(request, response) {
    let newsletters = await db.getNewsletters();
    let data = { newsletters: newsletters };

    response.send(data);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

async function uploadNewsletters(request, response) {
    let upload = multer({ storage: storage }).single('newNewsletters');

    upload(request, response, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(request.file);
            response.send('Single File');
        }
    });
}

module.exports.getAllUsers = getAllUsers;
module.exports.getAllTopics = getAllTopics;
module.exports.getAllSubscriptions = getAllSubscriptions;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;
module.exports.getNewsletters = getNewsletters;
module.exports.uploadNewsletters = uploadNewsletters;