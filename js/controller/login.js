$(function () {
    //On Login form submit
    $('#login').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "Err") {
                    //Login Details Incorrect
                    $('#loginErr').attr('hidden', false);
                    $('#inpLoginEmail').addClass("is-invalid");
                    $('#inpLoginPassword').addClass("is-invalid");
                } else if (response.replace(/[0-9]/g, '') == "user") {
                    //User details correct

                    //Set User Cookie That Expires in 7 Days
                    Cookies.set("user", response.replace(/^\D+/g, ''), { expires: 7 });

                    $('#loginErr').attr('hidden', true);
                    $('#inpLoginEmail').removeClass("is-invalid");
                    $('#inpLoginPassword').removeClass("is-invalid");

                    localStorage.setItem('topic', "1");

                    location.replace("/main");
                } 
            }
        });
        return false;
    });
});