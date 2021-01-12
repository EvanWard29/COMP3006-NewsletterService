$(function () {
    //Get User's details when Account page loads
    $.post("/api/getUserDetails", function (data) {
        let user = data[0];

        let firstName = user.firstName;
        let lastName = user.lastName;
        let username = user.username;
        let email = user.email;
        let dob = user.dob;
        let gender = user.gender;

        $('#userFirstName').html(firstName);
        $('#userLastName').html(lastName);
        $('#userUsername').html(username);

        $('#userEmail').html(email);
        $('#currentEmail').val(email);
        $('#pswrdEmail').val(email);
        $('#deleteEmail').val(email);

        $('#userDOB').html(dob);
        $('#userGender').html(gender);
    });

    $('#btnLogout').click(async function () {
        //Delete Cookie
        Cookies.remove("user");

        //Remove Topic ID
        localStorage.removeItem("topic");
        location.reload();
    })

    $('#btnChangeEmail').click(function () {
        //Show Change Email Popup
        $('#changeEmail').modal('show');
    });

    $('#btnChangePassword').click(function () {
        //Show Change Password Popup
        $('#changePassword').modal('show');
    });

    $('#btnDeleteAccount').click(function () {
        //Show Delete Account Popup
        $('#deleteAccount').modal('show');
    });

    //On Update Email form submit
    $('#updateEmail').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "Err") {
                    $('#passwordErr').attr('hidden', false);
                    $('#emailPasswordConfirm').addClass("is-invalid");
                } else if (response == "success") {
                    alert("Email Successfully Updated");
                    location.reload();
                }
            }
        });
        return false;
    });

    //On Update Password form submit
    $('#updatePassword').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "passwordErr") {
                    //New passwords don't match
                    $('#passwordMismatch').attr('hidden', false);
                    $('#newPassword').addClass("is-invalid");
                    $('#confirmNewPassword').addClass("is-invalid");
                } else if (response == "incorrectPswrd") {
                    //Incorrect Password Err
                    $('#passwordMismatch').attr('hidden', true);
                    $('#newPassword').removeClass("is-invalid");
                    $('#confirmNewPassword').removeClass("is-invalid");

                    $('#passwordIncorrect').attr('hidden', false);
                    $('#currentPassword').addClass("is-invalid");
                } else if (response == "success") {
                    //Password Updated
                    $('#passwordMismatch').attr('hidden', true);
                    $('#passwordIncorrect').attr('hidden', true);
                    $('#currentPassword').removeClass("is-invalid");
                    $('#newPassword').removeClass("is-invalid");
                    $('#confirmNewPassword').removeClass("is-invalid");

                    alert("Password Successfully Updated");
                    location.reload();
                }
            }
        });
        return false;
    });

    //On Delete Account form submit
    $('#frmDeleteAccount').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: async function (response) {
                if (response == "incorrectPswrd") {
                    $('#confirmErr').attr('hidden', false);
                    $('#confirmPswrdDelete').addClass("is-invalid");
                } else if (response == "success") {
                    //User deleted
                    $('#confirmErr').attr('hidden', true);
                    $('#confirmPswrdDelete').removeClass("is-invalid");

                    alert("Your Account Was Successfully Deleted");

                    /* Logout Process */
                    //Delete Cookie
                    Cookies.remove("user");

                    //Remove Topic ID
                    localStorage.removeItem("topic");
                    location.reload();
                }
            }
        });
        return false;
    });
})