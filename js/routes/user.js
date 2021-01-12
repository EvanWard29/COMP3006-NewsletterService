let db = require("../collections/db.js");

let { encrypt, decrypt } = require('../collections/crypto.js');
let cookie = require("cookie");

async function getAllUsers(request, response) {
    let users = await db.getUsers();
    let data = { users: users };

    response.send(data);
}

async function getUserDetails(request, response) {
    try {
        let userCookie = cookie.parse(request.headers.cookie);

        let userID = userCookie.user;
        let user = await db.getUser(userID);

        response.send(user);
    } catch (err) {
        let userID = request.body.testUserID;
        let user = await db.getUser(userID);

        response.send(user);
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
        }
    }
}

async function getAdmins(request, response) {
    let admins = await db.getAdmins();

    response.send(admins);
}

async function adminActive(request, response) {
    try {
        let userCookie = cookie.parse(request.headers.cookie);
        response.send(userCookie.user);
    } catch (err) {
        response.redirect("/login");
    }
}

async function logoutUser(request, response) {
    response.redirect("/login");
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
            try {
                let userCookie = cookie.parse(request.headers.cookie);
                await db.updateEmail(userCookie.user, newEmail);
                response.end("success");
            } catch (err) {
                await db.updateEmail(request.body.testUserID, newEmail);
                response.end("SUCCESS");
            }
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
                try {
                    //Update Password
                    let userCookie = cookie.parse(request.headers.cookie);
                    await db.updatePassword(userCookie.user, newPassword);
                    response.end("success");
                } catch (err) {
                    await db.updatePassword(request.body.testUserID, newPassword);
                    response.end("SUCCESS");
                }
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
            try {
                let userCookie = cookie.parse(request.headers.cookie);
                await db.deleteUser(userCookie.user);

                response.end("success");
            } catch (err) {

                await db.deleteUser(request.body.testUserID);

                response.end("SUCCESS");
            }
        }
    }
}

async function account(request, response) {
    try {
        cookie.parse(request.headers.cookie); //Check if Cookies are set
        response.render("account");
    } catch {
        //If no cookie set, redirect to login
        response.redirect('/login');
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

/* LOGIN/REGISTER EXPORTS */
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;