$(function () {
    $('#login').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "Err") {
                    $('#loginErr').attr('hidden', false);
                    $('#inpLoginEmail').addClass("is-invalid");
                    $('#inpLoginPassword').addClass("is-invalid");
                } else if (response == "success") {
                    $('#loginErr').attr('hidden', true);
                    $('#inpLoginEmail').removeClass("is-invalid");
                    $('#inpLoginPassword').removeClass("is-invalid");

                    location.replace("/main");
                }
            }
        });
        return false;
    });
});