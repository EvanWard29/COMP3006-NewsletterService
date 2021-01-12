let db = require("../collections/db.js");

//File Manipulation Imports
let fs = require('fs');
let multer = require('multer');
let path = require("path");

async function getNewsletters(request, response) {
    let newsletters = await db.getNewsletters(); //Get all Newsletters from DB
    let data = { newsletters: newsletters };

    response.send(data);
}

//Setup File Upload Process
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Upload/Save new Newsletter to temporary server folder
async function uploadNewsletters(request, response) {
    let upload = multer({ storage: storage }).single('newsletter');

    upload(request, response, function (err) {
        if (err) {
            return response.end("Error uploading file.");
        } else {
            response.end(request.file.filename);
        }
    });
}

//Move Newsletter from temp folder to correct topic folder
async function moveFile(request, response) {
    let fileName = request.body.fileName;
    let topicName = request.body.topicName.toString().toLowerCase();

    let date = request.body.date;
    let title = path.basename(request.body.title);

    let oldPath = path.dirname(require.main.filename) + "/uploads/" + fileName;
    let newPath = path.dirname(require.main.filename) + "/newsletters/"+ topicName + "/" + date;

    //If a topic folder doesn't exist, create one
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

/* NEWSLETTER EXPORTS */
module.exports.getNewsletters = getNewsletters;
module.exports.uploadNewsletters = uploadNewsletters;
module.exports.moveFile = moveFile;