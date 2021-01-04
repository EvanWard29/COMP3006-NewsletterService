let chai = require("chai");
let chaiHttp = require("chai-http");
let chaiAsPromised = require("chai-as-promised");

let routes = require("../js/routes/routes");
let server = require("../server");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

suite("Test Get UserDetails", function () {
    setup(function () {
        this.app = server.app;
    })

    test("Test POST /api/getUserDetails", async function () {
        await chai.request(this.app).post("/api/getUserDetails")/*.send({ email: "Evan29Ward@gmail.com" })*/.then(function(err, response) {
            chai.assert.equal(response.status, 200);
            console.log(response);
            chai.assert.equal(response.body.userID, "HELLO", "Invalid User");

            
        });
    });
    //test("Test Get User Details", function () {
    //    chai.request(this.app).get("/test").end(function (error, response) {
    //        chai.assert.equal(response.status, 200);
    //        chai.assert.equal(response.text, "TEST", "Invalid Response");
          
    //    });
    //});
});