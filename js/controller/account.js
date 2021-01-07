$(function () {
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

        //Destroy Session
        //await $.post("/api/logout");

        //Remove Topic ID
        localStorage.removeItem("topic");
        location.reload();
    })

    $('#btnChangeEmail').click(function () {
        $('#changeEmail').modal('show');
    });

    $('#btnChangePassword').click(function () {
        $('#changePassword').modal('show');
    });

    $('#btnDeleteAccount').click(function () {
        $('#deleteAccount').modal('show');
    });

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

    $('#updatePassword').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "passwordErr") {
                    console.log("PASSWORDS DON'T MATCH");
                    $('#passwordMismatch').attr('hidden', false);
                    $('#newPassword').addClass("is-invalid");
                    $('#confirmNewPassword').addClass("is-invalid");
                } else if (response == "incorrectPswrd") {
                    console.log("INCORRECT PASSWORD ENTERED");
                    $('#passwordMismatch').attr('hidden', true);
                    $('#newPassword').removeClass("is-invalid");
                    $('#confirmNewPassword').removeClass("is-invalid");

                    $('#passwordIncorrect').attr('hidden', false);
                    $('#currentPassword').addClass("is-invalid");
                } else if (response == "success") {
                    console.log("UPDATE SUCCESSFUL");
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
                    $('#confirmErr').attr('hidden', true);
                    $('#confirmPswrdDelete').removeClass("is-invalid");

                    alert("Your Account Was Successfully Deleted");

                    //Delete Cookie
                    Cookies.remove("user");

                    //Destroy Session
                    await $.post("/api/logout");

                    //Remove Topic ID
                    localStorage.removeItem("topic");
                    location.reload();
                }
            }
        });
        return false;
    });
})