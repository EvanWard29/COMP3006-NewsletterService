let Topics = [];
let Users = [];
let Subscriptions = [];

$(function () {
    /***** Setting up arrays *****/
    $.post("/api/getTopics", async function (data) {
        let topics = data.topics;

        for (let i = 0; i < topics.length; i++) {
            await addTopic(new Topic(topics[i].topicID, topics[i].topicName, topics[i].topicDescription));
        }

        let id = localStorage.getItem("topic");

        if (id != null) {
            for (let i = 0; i < Topics.length; i++) {
                if (Topics[i].topicID == id) {
                    $('#topicName').html(Topics[i].topicName);
                    $('#topicDescription').html(Topics[i].topicDescription);
                    break;
                }
            }
        } else {
            $('#topicName').html(Topics[0].topicName);
            $('#topicDescription').html(Topics[0].topicDescription);
        }
    });

    $.post("/api/getUsers", async function (data) {
        let users = data.users;

        for (let i = 0; i < users.length; i++) {
            await addUser(new User(users[i].userID, users[i].firstName, users[i].lastName, users[i].username,
                users[i].email, users[i].password, users[i].dob, users[i].gender));
        }
    });

    $.post("/api/getSubscriptions", async function (data) {
        let subscriptions = data.subscriptions;

        for (let i = 0; i < subscriptions.length; i++) {
            await addSubscription(new Subscription(subscriptions[i].subscriptionID, subscriptions[i].userID, subscriptions[i].topicID));
        }
    });
    /***** END *****/
})

function addTopic(topic) {
    Topics.push(topic);
}

function addUser(user) {
    Users.push(user);
}

function addSubscription(subscription) {
    Subscriptions.push(subscription);
}