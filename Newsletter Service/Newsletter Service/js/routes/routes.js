let db = require("../collections/db.js");

async function listAllTopics(request, response) {
    let topics = await db.getTopics();
    let data = { topics: topics };

    response.render("main", data);
}

async function getAllTopics(request, response) {
    let topics = await db.getTopics();
    let data = { topics: topics };

    response.send(data);
}

async function addTopic(request, response) {
    await db.addTopic(request.body.topicID, request.body.topicName, request.body.topicDescription);
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

module.exports.getAllUsers = getAllUsers;
module.exports.getAllTopics = getAllTopics;
module.exports.getAllSubscriptions = getAllSubscriptions;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;