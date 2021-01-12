let Topics = [];
let Admins = [];
let Newsletters = [];

$(async function () {
/***** Setting up arrays *****/
    //Get all Topics from DB on page load
    await $.post("/api/getTopics", async function (data) {
        let topics = data.topics;

        for (let i = 0; i < topics.length; i++) {
            await addTopic(new Topic(topics[i].topicID, topics[i].topicName, topics[i].topicDescription)); //Add Topic to Array
        }

        let id = localStorage.getItem("topic");

        //If user has refreshed page, topicID should not be null
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

    //Get a list of Admins from DB
    await $.post("/api/getAdmins", async function (data) {
        let admins = data;

        for (let i = 0; i < admins.length; i++) {
            await addAdmin(new Admin(admins[i].adminID, admins[i].userID));
        }
    })

    //If an Admin has logged in, show admin options
    $.post("/api/adminActive", async function (data) {
        let user = data;

        for (let i = 0; i < Admins.length; i++) {
            if (Admins[i].userID == user) {
                $('#btnNewTopic').attr('hidden', false);
                $('#btnNewNewsletter').attr('hidden', false);
                
                break;
            } else {
                $('#btnNewTopic').attr('hidden', true);
                $('#btnNewNewsletter').attr('hidden', true);
            }
        }
    })

    //Get all Newsletters from DB on page load
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

function addAdmin(admin) {
    Admins.push(admin);
}

function addNewsletter(newsletter) {
    Newsletters.push(newsletter);
}

