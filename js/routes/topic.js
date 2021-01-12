let db = require("../collections/db.js");
let cookie = require("cookie");

async function listAllTopics(request, response) {
    try {
        cookie.parse(request.headers.cookie); //If User Cookie is not set, user is not logged in

        let topics = await db.getTopics();
        let newsletters = await db.getNewsletters();

        let data = {
            topics: topics,
            newsletters: newsletters
        };

        response.render("main", data);
    } catch (err) {
        response.redirect('/login');
    }
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

/* TOPIC EXPORTS */
module.exports.getAllTopics = getAllTopics;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;