let Topics = [];
let Users = [];
let Subscriptions = [];
let Newsletters = [];

$(async function () {
    /***** Setting up arrays *****/
    await $.post("/api/getTopics", async function (data) {
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
                    $('#newsTopic').html(Topics[i].topicName);

                    $('[id="topic' + id + '"]').attr('hidden', false);
                    break;
                }
            }
        } else {
            $('#topicName').html(Topics[0].topicName);
            $('#topicDescription').html(Topics[0].topicDescription);
            $('#newsTopic').html(Topics[0].topicName);

            $('[id="topic' + Topics[0].topicID + '"]').attr('hidden', false);
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

    $.post("/api/getNewsletters", async function (data) {
        let newsletters = data.newsletters;

        for (let i = 0; i < newsletters.length; i++) {
            await addNewsletter(new Newsletter(newsletters[i].newsletterID, newsletters[i].topicID, newsletters[i].title, newsletters[i].date, newsletters[i].URL));
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

function addNewsletter(newsletter) {
    Newsletters.push(newsletter);
}

/*async function addNewsletter(topicName, data) {
    //console.log(data);
    data.forEach(async function (date) {
        await $.post("/api/getNewsletterInfo", {
            topicName: topicName,
            date: date
        }, async function (title) {
                let titleName = "";
                title.forEach(function (info) {
                    if (info != "info.json") {
                        titleName = info;
                    }
                });

                let topic = {
                    topicName: topicName,
                    date: date,
                    title: titleName
                };
                await Newsletters.push(topic);
        });
    });
}*/