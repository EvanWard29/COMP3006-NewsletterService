let mongoose = require("mongoose");

/* TOPIC */
let topicSchema = new mongoose.Schema({
    topicID: Number,
    topicName: String,
    topicDescription: String
});
let Topic = mongoose.model('topics', topicSchema);

async function getTopics() {
    let topics = await Topic.find().sort([["topicID", "asc"]]);
    return topics;
}

async function addTopic(topicID, topicName, topicDescription) {
    await Topic.create({ topicID: topicID, topicName: topicName, topicDescription: topicDescription });
}

/* USER */
let userSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    dob: String,
    gender: String
});
let User = mongoose.model("users", userSchema);

async function getUsers() {
    let users = await User.find({});
    return users;
}

/* SUBSCRIPTION*/
let subscriptionSchema = new mongoose.Schema({
    subscriptionID: String,
    userID: String,
    topicID: String
});
let Subscription = mongoose.model("subscriptions", subscriptionSchema);

async function getSubscriptions() {
    let subs = await Subscription.find();
    return subs;
}

module.exports.getUsers = getUsers;
module.exports.getTopics = getTopics;
module.exports.getSubscriptions = getSubscriptions;
module.exports.addTopic = addTopic;