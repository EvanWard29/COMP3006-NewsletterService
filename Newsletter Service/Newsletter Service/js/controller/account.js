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

        $('#userDOB').html(dob);
        $('#userGender').html(gender);
    });

    $('#btnLogout').click(async function () {
        //Delete Cookie
        Cookies.remove("user");

        //Destroy Session
        await $.post("/api/logout");

        //Remove Topic ID
        localStorage.removeItem("topic");
        location.reload();
    })

    $('#btnChangeEmail').click(function () {
        $('#changeEmail').modal('show');
    })

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
})