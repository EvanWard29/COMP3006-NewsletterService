let Folders = [];
$(function () {
    if (sessionStorage.getItem("ADMIN") == "true") {
        $('#btnNewTopic').attr('hidden', false);
    }
    else {
        $('#btnNewTopic').attr('hidden', true);
    }

    //console.log(getNewsletters(localStorage.getItem("topic")));

    //if (localStorage.getItem("topic") != null) {
    //    getNewsletters(localStorage.getItem("topic"));
    //}

    $("td").click(async function () {
        let id = $(this).attr('id');
        let oldID = localStorage.getItem('topic');

        $('[id="topic' + oldID + '"]').attr('hidden', true);

        await getNewsletters(id);
    });

    $("#btnNewTopic").click(function () {
        $('#newTopic').modal('show');
    });

    $("#btnAddChore").click(function () {
        if (($('#newTopicName').val() != "") && ($('#newTopicDescription').val() != "")) {
            let newTopicName = $('#newTopicName').val();
            let newTopicDescription = $('#newTopicDescription').val();
            let id = Topics[Topics.length - 1].topicID + 1;

            let topic = new Topic(id, newTopicName, newTopicDescription);
            Topics.push(topic);

            addToList(topic);
            addToDatabase(topic);

            $('#newTopic').modal('hide');
        } else {
            $('#newTopicErr').attr('hidden', false);
        }
    
    });

    $('p').click(function () {
        let id = $(this).attr('id');

        if (id.replace(/[0-9]/g, '') == 'newsletter') {
            let topicID = localStorage.getItem('topic');
            let topicName = $('#newsTopic').html();

            for (let i = 0; i < Newsletters.length; i++) {
                if (id.replace(/^\D+/g, '') == Newsletters[i].newsletterID) {
                    let URL = Newsletters[i].url;

                    $('#newsletterPDF').attr('src', URL);

                    break;
                }
            }

            $('#newsTopic').html(topicName + " - " + $(this).text());


            $('#newsletter').modal('show');
        }
    });
});

function getNewsletters(id) {
    for (let i = 0; i < Topics.length; i++) {
        if (Topics[i].topicID == id) {
            localStorage.removeItem("topic");

            let topicName = Topics[i].topicName;
            let topicDescription = Topics[i].topicDescription;

            $('#topicName').html(topicName);
            $('#topicDescription').html(topicDescription);

            localStorage.setItem("topic", id);

            $('#newsTopic').html(Topics[i].topicName);
            //$('#newsletters').empty();

            $('[id="topic'+ id +'"]').attr('hidden', false);

            break;
        }
    }
}

function addToList(topic) {
    $('#topics').append("<tr><td id='" + topic.topicID + "'>" + topic.topicName + "</td><tr>");
}

async function addToDatabase(topic) {
    let topicID = topic.topicID;
    let topicName = topic.topicName;
    let topicDescription = topic.topicDescription;

    $.post("/api/addTopic", {
        topicID: topicID,
        topicName: topicName,
        topicDescription: topicDescription
    });
}
