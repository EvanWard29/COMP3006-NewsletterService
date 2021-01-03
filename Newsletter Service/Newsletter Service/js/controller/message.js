$(function () {
    let socket = io("http://localhost:9000");

    socket.on("received message", function (msg) {
        $('#msgOutput').append("<p class=\"message text-break\">" + msg + "</p>");
    });

    $("#send").click(function () {
        $.post("/api/getUserDetails", function (data) {
            let user = data[0];
            let username = user.username;

            let msg = username + ": " + $('#inpMessage').val();

            socket.emit("send message", msg);
            $('#msgOutput').append("<p class=\"message sent text-break\">" + msg +"</p>");
        });

    });
});
