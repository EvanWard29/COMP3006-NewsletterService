let db = require("../collections/db.js");
let fs = require('fs');
let multer = require('multer');
let path = require("path");
let { encrypt, decrypt } = require('../collections/crypto.js');
let cookie = require("cookie");

let sess;

async function listAllTopics(request, response) {
    let userCookie = cookie.parse(request.headers.cookie);
    
    if (typeof userCookie.user !== 'undefined') {
        //If a Cookie is Set, set the User Session
        //sess = request.session;
        //sess.user = userCookie.user;
    }

    if (typeof userCookie.user !== 'undefined') {
        //If a Cookie is Set

        let topics = await db.getTopics();
        let newsletters = await db.getNewsletters();

        let data = {
            topics: topics,
            newsletters: newsletters
        };

        response.render("main", data);

    } else {
        //Otherwise Redirect to Login Page
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

async function getAllUsers(request, response) {
    let users = await db.getUsers();
    let data = { users: users };

    response.send(data);
}

async function getUserDetails(request, response) {
    let userCookie = cookie.parse(request.headers.cookie);

    let userID = userCookie.user;
    let user = await db.getUser(userID);

    response.send(user);
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

async function registerUser(request, response) {
    let agree = request.body.inpAgree;

    if (agree == "on") {
        let firstName = request.body.inpFirstName;
        let lastName = request.body.inpLastName;
        let username = request.body.inpUsername;
        let email = request.body.inpEmail;

        let password = encrypt(Buffer.from(request.body.inpPassword, 'utf8'));
        let confirm = encrypt(Buffer.from(request.body.inpConfirmPassword, 'utf8'));

        let dob = request.body.inpDOB;
        let gender = request.body.inpGender;

        let usernames = await db.getUsernames();
        let userID = usernames.length + 1;


        let err = false;

        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i].username == username) {
                err = true;
                response.end("usernameErr");
                break;
            }
        }


        if (err != true) {
            if (decrypt(password).localeCompare(decrypt(confirm)) != 0) {
                err = true;
                response.end("passwordErr");
            }
        }

        if (err != true) {
            let user = {
                userID: userID,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
                confirm: confirm,
                dob: dob,
                gender: gender
            }

            await db.addUser(user.userID, user.firstName, user.lastName, user.username, user.email, user.password, user.dob, user.gender);

            response.end("success");
        }
    } else {
        response.end("agreeErr");
    }
}

async function loginUser(request, response) {
    let email = request.body.inpLoginEmail;
    let password = encrypt(Buffer.from(request.body.inpLoginPassword));
    let remember = request.body.inpRemember;

    let userPassword = await db.loginUser(email);

    if (userPassword === undefined || userPassword.length == 0) {
        response.end("Err");
    } else {
        if (decrypt(userPassword[0].password) != decrypt(password)) {
            //Passwords Do Not Match
            response.end("Err")
        } else {
            //Set Session with User Details
            let user = await db.getUserDetails(email);
           
            //Return UserID for Cookie Setting
            response.send("user" + user[0].userID);

            //Remember Me Settings
            
        }
    }
}

async function getAdmins(request, response) {
    let admins = await db.getAdmins();

    response.send(admins);
}

async function adminActive(request, response) {
    let userCookie = cookie.parse(request.headers.cookie);
    response.send(userCookie.user);
}

async function logoutUser(request, response) {
    //sess = undefined;
    response.redirect("/login");
}

async function account(request, response) {
    let userCookie = cookie.parse(request.headers.cookie);

    if (typeof userCookie.user !== 'undefined') {
        //If a Cookie is Set, set the User Session
        //sess = request.session;
        //sess.user = userCookie.user;
    }

    if (typeof userCookie.user !== 'undefined') {
        response.render("account");
    } else {
        //Otherwise Redirect to Login Page
        response.redirect('/login');
    }
}

async function changeEmail(request, response) {
    let currentEmail = request.body.currentEmail;
    let newEmail = request.body.newEmail;
    let inpPassword = encrypt(Buffer.from(request.body.emailPasswordConfirm));

    let userPassword = await db.loginUser(currentEmail);

    if (userPassword === undefined || userPassword.length == 0) {
        response.end("Err");
    } else {
        if (decrypt(userPassword[0].password) != decrypt(inpPassword)) {
            //Passwords Do Not Match
            response.end("Err")
        } else {
            //Update Email
            let userCookie = cookie.parse(request.headers.cookie);
            await db.updateEmail(userCookie.user, newEmail);
            response.end("success");
        }
    }
}

async function changePassword(request, response) {
    let email = request.body.email;
    let oldPassword = encrypt(Buffer.from(request.body.currentPassword));
    let newPassword = encrypt(Buffer.from(request.body.newPassword));
    let confirm = encrypt(Buffer.from(request.body.confirmNewPassword));

    if (decrypt(newPassword).localeCompare(decrypt(confirm)) != 0) {
        err = true;
        response.end("passwordErr");
    } else {
        let userPassword = await db.loginUser(email);

        if (userPassword === undefined || userPassword.length == 0) {
            response.end("Err");
        } else {
            if (decrypt(userPassword[0].password) != decrypt(oldPassword)) {
                //Passwords Do Not Match
                response.end("incorrectPswrd")
            } else {
                //Update Password
                let userCookie = cookie.parse(request.headers.cookie);
                await db.updatePassword(userCookie.user, newPassword);
                response.end("success");
            }
        }
    }
}

async function deleteAccount(request, response) {
    let email = request.body.deleteEmail;
    let password = encrypt(Buffer.from(request.body.confirmPswrdDelete));

    let userPassword = await db.loginUser(email);

    if (userPassword === undefined || userPassword.length == 0) {
        response.end("Err");
    } else {
        if (decrypt(userPassword[0].password) != decrypt(password)) {
            //Passwords Do Not Match
            response.end("incorrectPswrd")
        } else {
            //Delete Account
            let userCookie = cookie.parse(request.headers.cookie);
            await db.deleteUser(userCookie.user);

            response.end("success");
        }
    }
}

/* USER EXPORTS */
module.exports.getAllUsers = getAllUsers;
module.exports.getUserDetails = getUserDetails;
module.exports.account = account;
module.exports.changeEmail = changeEmail;
module.exports.changePassword = changePassword;
module.exports.deleteAccount = deleteAccount;

/* ADMIN EXPORTS */
module.exports.getAdmins = getAdmins;
module.exports.adminActive = adminActive;

/* TOPIC EXPORTS */
module.exports.getAllTopics = getAllTopics;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;

/* SUBSCRIPTION EXPORTS */
module.exports.getAllSubscriptions = getAllSubscriptions;

/* NEWSLETTER EXPORTS */
module.exports.getNewsletters = getNewsletters;
module.exports.uploadNewsletters = uploadNewsletters;
module.exports.moveFile = moveFile;

/* LOGIN/REGISTER EXPORTS */
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;