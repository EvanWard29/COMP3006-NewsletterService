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
    let upload = multer({ storage: storage }).single('newsletter');

    //console.log(request.body.hiddenTopic);

    upload(request, response, function (err) {
        if (err) {
            //console.log(err);
            return response.end("Error uploading file.");
        } else {
            //console.log(request.file);
            //console.log(request.body.hiddenTopic);
            response.end(request.file.filename);
        }
    });
}

async function moveFile(request, response) {
    let fileName = request.body.fileName;
    let topicName = request.body.topicName.toString().toLowerCase();

    let date = request.body.date;
    let title = path.basename(request.body.title);

    let oldPath = path.dirname(require.main.filename) + "/uploads/" + fileName;
    let newPath = path.dirname(require.main.filename) + "/newsletters/"+ topicName + "/" + date;

    if (!fs.existsSync(path.dirname(require.main.filename) + newPath)) {
        fs.mkdir(newPath, async function (err) {
            if (err) {
                response.send("error");
            } else {
                fs.rename(oldPath, newPath + "/" + title, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })

                let newsletterID = request.body.newsletterID;
                let topicID = request.body.topicID;

                let URL = topicName + "/" + date + "/" + title;

                await db.addNewsletter(newsletterID, topicID, title, date, URL);

                response.send("success");
            }
        });
        
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getAllTopics = getAllTopics;
module.exports.getAllSubscriptions = getAllSubscriptions;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;
module.exports.getNewsletters = getNewsletters;
module.exports.uploadNewsletters = uploadNewsletters;
module.exports.moveFile = moveFile;