// show user register selected image for upload
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#ShowUserImage')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        }

        reader.readAsDataURL(input.files[0]);
    }

}


$(document).on('change', '#UserPhoto', function(event) {
    event.preventDefault();
    if ($('#UserPhoto').val() == '') {
        $('#ShowUserImage').attr('hidden', 'hidden');
    } else {
        $('#ShowUserImage').removeAttr('hidden');
    }
});


$(document).ready(function() {

    // User Register Submit
    $(document).on('submit', '#UserRegisterForm', function(event) {
        event.preventDefault();
        var password = $('#UserNewPassword').val();
        var retypePassword = $('#UserRetypeNewPassword').val();
        if (password == retypePassword) {
            // first uploads register profile photo
            var userRegisterFormPhoto = $('#UserPhoto')[0].files[0];
            var formdata = new FormData();
            formdata.append("UserPhoto", userRegisterFormPhoto);
            // ajax for storing photo of user
            $.ajax({
                url: 'http://localhost:3000/user/register/userPhoto',
                method: 'post',
                contentType: false,
                processData: false,
                data: formdata,
                dataType: 'json',
                success: function(result, status) {
                    console.log(result);
                    console.log(status);
                    // console.log(result.name);
                    registerprofiletext(result.name);

                    // console.log(result.message)
                },
                error: function(jqXHR, status) {
                    // console.log(jqXHR.responseJSON.message);
                    console.log('upload failed');
                }
            });
        } else {
            alert('Check retype password');
            $('#UserRetypeNewPassword').focus();
        }

    });

});


// register profile picture upload function
function registerprofile() {
    var userRegisterFormPhoto = $('#UserPhoto')[0].files[0];
    var formdata = new FormData();
    formdata.append("UserPhoto", userRegisterFormPhoto);
    // ajax for storing photo of user
    $.ajax({
        url: 'http://localhost:3000/user/register/userPhoto',
        method: 'post',
        contentType: false,
        processData: false,
        data: formdata,
        dataType: 'json',
        success: function(result, status) {
            console.log(result);
            console.log(status);
            console.log(result.message)
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR.responseJSON.message);
            alert('upload failed');
        }
    });
}


// register profile text upload function
function registerprofiletext(name) {

    var gender = $("input[name='UserGender']:checked").val();
    var password = $('#UserNewPassword').val();
    var userRegisterFormData = {
        // key         value
        FirstName: $('#UserFirstName').val(),
        MiddleName: $('#UserMiddleName').val(),
        LastName: $('#UserLastName').val(),
        Gender: gender,
        Address: $('#UserAddress').val(),
        DOB: $('#UserDob').val(),
        Email: $('#UserEmail').val(),
        Phone: $('#UserPhone').val(),
        Photo: name,
        Password: password
    }
    // console.log(userRegisterFormData);
    $.ajax({
        url: 'http://localhost:3000/user/register/userFormData',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(userRegisterFormData),
        success: function(result, status) {
            console.log(result);
            console.log(status);
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
            // console.log(jqXHR.status);
            // console.log(jqXHR.responseJSON.message);
            console.log(status);
            // $('#message').html(jqXHR.responseJSON.message);
            console.log('data upload failed');
            alert(jqXHR.responseJSON.message);

        }
    });


}



// User Login
$(document).ready(function() {
    $(document).on('submit', '#UserLoginForm', function(event) {
        event.preventDefault();
        const myFormData = {
            email: $('#LoginEmail').val(),
            password: $('#LoginPassword').val()
        }

        $.ajax({
            // v1 is the version , users is the route in backend 
            url: 'http://localhost:3000/user/login',
            method: 'post',
            contentType: 'application/json',
            // headers: { 'Authorization' : window.localStorage.getItem('token')},
            data: JSON.stringify(myFormData),
            success: function(result, status) {
                // console.log(result);
                // $('#message').html(result.message);
                // window.location.href = "usersdashboard.html";
                console.log(result.token);
                window.localStorage.setItem('token', result.token);
                window.localStorage.setItem('token', 'result.token');
                window.location.href = "../user/userDashboard.html";
            },
            error: function(jqXHR, status) {
                 // console.log(jqXHR.responseJSON.message);
                // $('#message').html(jqXHR.responseJSON.message);
                alert(jqXHR.responseJSON.message);
                $('#LoginPassword').val('');
                $('#LoginPassword').focus();
            }
        });

    });
});