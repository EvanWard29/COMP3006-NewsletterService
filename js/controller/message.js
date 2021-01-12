$(function () {
    let socket = io("http://localhost:9000");

    //Add message sent by other users to message board
    socket.on("received message", function (msg) {
        $('#msgOutput').append("<p class=\"message text-break\">" + msg + "</p>");
    });

    //Send User Message to server for emitting to other cleints
    $("#send").click(function () {
        $.post("/api/getUserDetails", function (data) {
            let user = data[0];
            let username = user.username;

            let msg = username + ": " + $('#inpMessage').val();

            socket.emit("send message", msg);
            $('#msgOutput').append("<p class=\"message sent text-break\">" + msg + "</p>");
            $('#inpMessage').val("");
        });

    });
});
