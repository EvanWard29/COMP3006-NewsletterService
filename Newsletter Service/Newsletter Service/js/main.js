$(function () {
    $("td").click(function () {
        console.log($(this).attr('id'));
        console.log("HELLO");
    });

});