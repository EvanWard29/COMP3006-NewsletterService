let Folders = [];
$(function () {
    $("td").click(async function () {
        let id = $(this).attr('id');
        let oldID = localStorage.getItem('topic');

        $('[id="topic' + oldID + '"]').attr('hidden', true);

        await getNewsletters(id);
    });

    $("#btnNewTopic").click(function () {
        $('#newTopic').modal('show');
    });

    $("#btnAddTopic").click(function () {
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

    $('#btnNewNewsletter').click(function () {
        $('#upload').modal('show');
    });

    /*$('#btnUpload').click(function () {
        let newNewsletters = $('#newNewsletters').val();
   
        $.post("/api/uploadNewsletter", {
            file: newNewsletters
        })
    });*/

    $('#uploadNewsletter').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                let fileName = response;
                let topicID = localStorage.getItem('topic');
                let topicName = null;

                for (let i = 0; i < Topics.length; i++) {
                    if(Topics[i].topicID == topicID){
                        topicName = Topics[i].topicName;

                        break;
                    }
                }

                let ts = Date.now();

                let date_ob = new Date(ts);
                let currentDate = date_ob.getDate();
                let month = date_ob.getMonth() + 1;
                let year = date_ob.getFullYear();

                let uploadDate = currentDate + "-" + month + "-" + year.toString().substr(-2);

                let date = uploadDate;
                let title = $('#fileUpload').val();

                $.post('/api/moveFile', {
                    fileName: fileName,
                    topicName: topicName,
                    date: date,
                    title: title,
                    newsletterID: Newsletters[Newsletters.length - 1].newsletterID + 1,
                    topicID: topicID
                }, function (err) {
                        if (err == 'error') {
                            $('#newsletterErr').attr("hidden", false);
                        } else if (err == 'success') {
                            location.reload();
                        }
                })
            }
        });
        return false;
    });

    $('#btnLogout').click(async function () {
        //Delete Cookie
        Cookies.remove("user");

        //Destroy Session
        await $.post("/api/logout");

        //Remove Topic ID
        localStorage.removeItem("topic");
        location.reload();
    })
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
