let db = require("../collections/db.js");
let fs = require('fs');
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

async function showNewsletters(request, response) {
    let newsletters = request.body.newsletters;
    let topics = await db.getTopics();
    let data = {
        topics: topics,
        newsletters: ["HELLO", "HI", "BYE"]
    };
    //console.log(newsletters);
    //response.send("main", data);
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

async function getNumNewsletters(request, response) {
    let dir = path.join(path.dirname(require.main.filename), 'newsletters/' + request.body.topicName);

    fs.readdir(dir, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            //let files = [];
            //data.forEach(function (folderDate) {
                //fs.readdir(dir + "/" + folderDate, function (err, file) {
                //    if (err) {
                //        console.log(err);
                //    } else {
                //        //files.push(fileData);
                //        //temp.push(file);
                        
                //        let fileData = {
                //            info: file[0],
                //            pdf: file[1]
                //        };

                //        //console.log(fileData);
                //        files.push(fileData);
                //    }
                //});
                //files.push(temp);
                //console.log(temp);
            //});
            console.log(data);
            response.send(data);
        }
    });
}

/*async function getNewsletters(request, response) {
    //let dir = path.join(path.dirname(require.main.filename), 'newsletters/' + request.body.topicName + "/" + request.body.date);

    //fs.readdir(dir, function (err, files) {
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        response.send(files);
    //    }
    //});

    let dir = path.join(path.dirname(require.main.filename), 'newsletters/' + request.body.topicName);

    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log(err);
        } else {
            response.send(files);
            //console.log(files);
        }
    });
    
}*/

async function getNewsletterInfo(request, response) {
    let dir = path.join(path.dirname(require.main.filename), 'newsletters/' + request.body.topicName + "/" + request.body.date);
    let date = request.body.date;

    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log(err);
        } else {
            response.send(files);
        }
    })
}

module.exports.getAllUsers = getAllUsers;
module.exports.getAllTopics = getAllTopics;
module.exports.getAllSubscriptions = getAllSubscriptions;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;

module.exports.getNumNewsletters = getNumNewsletters;
module.exports.getNewsletters = getNewsletters;
module.exports.getNewsletterInfo = getNewsletterInfo;
module.exports.showNewsletters = showNewsletters;