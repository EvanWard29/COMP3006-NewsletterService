$(function () {
    //On Registration form submit
    $('#registration').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "usernameErr") {
                    //Username exists
                    $('#usernameErr').attr('hidden', false);
                    $('#inpUsername').addClass("is-invalid");
                } else if (response == "passwordErr") {
                    //Passwords don't match
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");

                    $('#passwordErr').attr('hidden', false);
                    $('#inpPassword').addClass("is-invalid");
                    $('#inpConfirmPassword').addClass("is-invalid");
                } else if (response == "success") {
                    //User added to DB
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");

                    $('#passwordErr').attr('hidden', true);
                    $('#inpPassword').removeClass("is-invalid");
                    $('#inpConfirmPassword').removeClass("is-invalid");

                    alert("Sign Up Complete");

                    location.replace("/login");
                } else if (response == "agreeErr") {
                    $('#agreeErr').attr('hidden', false);
                }
            }
        });
        return false;
    });

    $('#inpAgree').click(function () {
        if ($('#inpAgree').prop('checked') == true) {
            $('#agreeErr').attr('hidden', true);
        }
    })
});