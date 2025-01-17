let mongoose = require("mongoose");

/* TOPIC */
let topicSchema = new mongoose.Schema({
    topicID: Number,
    topicName: String,
    topicDescription: String
});
let Topic = mongoose.model('topics', topicSchema);

async function getTopics() {
    let topics = await Topic.find().sort([["topicID", "asc"]]); //Get all topics from DB in ascending order
    return topics;
}

async function addTopic(topicID, topicName, topicDescription) {
    await Topic.create({ topicID: topicID, topicName: topicName, topicDescription: topicDescription }); //Add new topic to DB
}

/* USER */
let userSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: Object,
    dob: String,
    gender: String
});
let User = mongoose.model("users", userSchema);

async function getUsers() {
    let users = await User.find({});
    return users;
}

async function getUser(userID) {
    let user = await User.find({ "userID": userID.toString() }, { password: 0, _id: 0, __v: 0 }); //Get all user details except password
    return user;
}

async function getUsernames() {
    let usernames = await User.find({}, {username: 1}); //Get all usernames from DB
    return usernames;
}

async function addUser(userID, firstName, lastName, username, email, password, dob, gender) {
    let user = {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        dob: dob,
        gender: gender
    }

    //Add new user to DB
    await User.create({ userID: userID, firstName: firstName, lastName: lastName, username: username, email: email, password: password, dob: dob, gender: gender });
}

async function loginUser(email) {
    let password = await User.find({ "email": email}, { password: 1 });
    return password;
}

async function getUserDetails(email) {
    let user = await User.find({ "email": email }, { password: 0 }); //Get user password
    return user;
}

async function updateEmail(userID, email) {
    await User.updateOne({ "userID": userID }, { $set: { email: email } });
}

async function updatePassword(userID, password) {
    await User.updateOne({ "userID": userID }, { $set: { password: password } })
}

async function deleteUser(userID){
    await User.deleteOne({ "userID": userID });
}

/* ADMIN */
let adminSchema = new mongoose.Schema({
    adminID: String,
    userID: String
})
let Admin = mongoose.model("admins", adminSchema);

async function getAdmins() {
    let admins = await Admin.find(); //Get list of all admins
    return admins;
}

/* NEWSLETTER*/
let newsletterSchema = new mongoose.Schema({
    newsletterID: Number,
    topicID: Number,
    title: String,
    date: String,
    URL: String
});
let Newsletter = mongoose.model("newsletters", newsletterSchema);

async function getNewsletters() {
    let newsletters = await Newsletter.find();
    return newsletters;
}

async function addNewsletter(newsletterID, topicID, title, date, URL) {
    await Newsletter.create({ newsletterID: newsletterID, topicID: topicID, title: title, date: date, URL: URL }); //Add new Newsletter to DB
}

/* USER EXPORTS */
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.getUsernames = getUsernames;
module.exports.getUserDetails = getUserDetails;
module.exports.getAdmins = getAdmins;

/* USER OPTIONS EXPORTS */
module.exports.updateEmail = updateEmail;
module.exports.updatePassword = updatePassword;
module.exports.deleteUser = deleteUser;

/* TOPIC EXPORTS */
module.exports.getTopics = getTopics;
module.exports.addTopic = addTopic;

/* NEWSLETTER EXPORTS */
module.exports.getNewsletters = getNewsletters;
module.exports.addNewsletter = addNewsletter;

/* LOGIN/REGISTRATION EXPORTS */
module.exports.loginUser = loginUser;
module.exports.addUser = addUser;