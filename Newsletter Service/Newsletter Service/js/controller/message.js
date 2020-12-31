$(function () {
    let socket = io("http://localhost:9000");

    socket.on("received message", function (msg) {
        $('#msgOutput').append("<p>Yest Message</p>");
    });

    $("#send").click(function () {
        let msg = "<p>Yest Message</p>";

        socket.emit("send message", msg);
        $('#msgOutput').append("<p>Yest Message</p>");
    });
});
