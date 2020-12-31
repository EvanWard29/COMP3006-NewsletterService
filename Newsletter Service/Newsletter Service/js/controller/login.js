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
                } else if (response.replace(/[0-9]/g, '') == "user") {
                    //Set Cookie That Expires in 7 Days
                    Cookies.set("user", response.replace(/^\D+/g, ''), { expires: 7 });

                    $('#loginErr').attr('hidden', true);
                    $('#inpLoginEmail').removeClass("is-invalid");
                    $('#inpLoginPassword').removeClass("is-invalid");

                    location.replace("/main");
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

    $('#inpCookies').click(function () {
        if ($('#inpCookies').prop('checked') == true) {
            $('#inpRemember').attr('disabled', false);
        } else if ($('#inpCookies').prop('checked') == false) {
            $('#inpRemember').attr('disabled', true);
            $('#inpRemember').prop('checked', false);
        }
    })
});