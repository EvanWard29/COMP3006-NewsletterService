$(function () {
    $('#registration').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "usernameErr") {
                    $('#usernameErr').attr('hidden', false);
                    $('#inpUsername').addClass("is-invalid");
                } else if (response == "passwordErr") {
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");

                    $('#passwordErr').attr('hidden', false);
                    $('#inpPassword').addClass("is-invalid");
                    $('#inpConfirmPassword').addClass("is-invalid");
                } else if (response == "success") {
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");

                    $('#passwordErr').attr('hidden', true);
                    $('#inpPassword').removeClass("is-invalid");
                    $('#inpConfirmPassword').removeClass("is-invalid");

                    alert("Sign Up Complete");

                    location.replace("/login");
                }
            }
        });
        return false;
    });
});