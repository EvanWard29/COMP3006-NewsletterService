let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../server");

chai.use(chaiHttp);

let userID = null;

suite("Test User Functions", async function () {
    setup(function () {
        this.app = server.app;

        this.userID = 4;
        this.firstName = "testFirstName";
        this.lastName = "testLastName"
        this.username = "testUsername";
        this.email = "test@TEST.com";
        this.password = "password"
        this.dob = "2020-12-21";
        this.gender = "Other";

        this.newEmail = "TEST@test.com";
        this.newPassword = "PASSWORD";
    });

    test("Register User", async function () {
        await chai.request(this.app).post("/api/register").send({
            inpAgree: "on",
            userID: this.userID,
            inpFirstName: this.firstName,
            inpLastName: this.lastName,
            inpUsername: this.username,
            inpEmail: this.email,
            inpPassword: this.password,
            inpConfirmPassword: this.password,
            inpDOB: this.dob,
            inpGender: this.gender
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "success", "User Not Registerd");
        });
    });

    test("User Login", async function () {
        await chai.request(this.app).post("/api/login").send({
            inpLoginEmail: this.email,
            inpLoginPassword: this.password
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            userID = response.text.replace(/^\D+/g, '');
            chai.assert.equal(response.text.replace(/[0-9]/g, ''), "user", "User Not Logged In");
        });
    });

    test("Change Email", async function () {
        await chai.request(this.app).post("/api/changeEmail").send({
            testUserID: userID,
            currentEmail: this.email,
            newEmail: this.newEmail,
            emailPasswordConfirm: this.password
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "Email Not Changed");
        });
    });

    test("Change Password", async function () {
        await chai.request(this.app).post("/api/changePassword").send({
            testUserID: userID,
            currentPassword: this.password,
            newPassword: this.newPassword,
            confirmNewPassword: this.newPassword,
            email: this.newEmail
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "Password Not Changed");
        });
    });

    test("Get User Details", async function () {
        let user = {
            userID: userID,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.newEmail,
            dob: this.dob,
            gender: this.gender
        };
        await chai.request(this.app).post("/api/getUserDetails").send({
            testUserID: userID
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.body[0].userID, user.userID, "Correct User Details Not Fetched");
        });
    });

    test("Delete User", async function () {
        await chai.request(this.app).post("/api/deleteAccount").send({
            testUserID: userID,
            deleteEmail: this.newEmail,
            confirmPswrdDelete: this.newPassword
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "User Not Deleted");
        });
    });
});

suite("Test Topic Functions", function () {
    setup(function () {
        this.app = server.app;
    });

    test("Get Topics", async function () {
        await chai.request(this.app).post("/api/getTopics").then(function (response) {
            if (!(response.error != true && typeof response.body == "object")) {
                chai.assert.fail("Topics Were Not Fetched");
            } 
        });
    });

    test("Get Newsletters", async function () {
        await chai.request(this.app).post("/api/getNewsletters").then(function (response) {
            if (!(response.error != true && typeof response.body == "object")) {
                chai.assert.fail("Newsletters Were Not Fetched");
            }
        });
    });

    //Upload Newsletter
    //Add Topic

    /* CLOSE SERVER */
    suiteTeardown(async function () {
        setTimeout((function () {
            return process.exit(0);
        }), 2000);
    })
});