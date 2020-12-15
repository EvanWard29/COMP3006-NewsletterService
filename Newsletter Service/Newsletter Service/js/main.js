$(function () {
    if (sessionStorage.getItem("ADMIN") == "true") {
        $('#btnNewTopic').attr('hidden', false);
    }
    else {
        $('#btnNewTopic').attr('hidden', true);
    }

    $("td").click(function () {
        let id = $(this).attr('id');

        for (let i = 0; i < Topics.length; i++) {
            if (Topics[i].topicID == id) {
                localStorage.removeItem("topic");

                let topicName = Topics[i].topicName;
                let topicDescription = Topics[i].topicDescription;

                $('#topicName').html(topicName);
                $('#topicDescription').html(topicDescription);

                localStorage.setItem("topic", id);

                break;
            }
        }
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
});

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