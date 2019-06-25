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
                // console.log(result.token);
                window.localStorage.setItem('token', result.token);
                console.log(result.info);
                window.sessionStorage.setItem('user_id', result.info.id);
                window.sessionStorage.setItem('user_first_name', result.info.first_name);
                window.sessionStorage.setItem('user_middle_name', result.info.middle_name);
                window.sessionStorage.setItem('user_last_name', result.info.last_name);
                window.sessionStorage.setItem('user_gender', result.info.gender);
                window.sessionStorage.setItem('user_email', result.info.email);
                window.sessionStorage.setItem('user_address', result.info.address);
                window.sessionStorage.setItem('user_dob', result.info.dob);
                window.sessionStorage.setItem('user_phone', result.info.phone);
                window.sessionStorage.setItem('user_photo', result.info.photo);
                window.sessionStorage.setItem('user_user_type', result.info.user_type);
                window.sessionStorage.setItem('user_createdAt', result.info.createdAt);
                window.sessionStorage.setItem('user_updatedAt', result.info.updatedAt);
                // var ses = window.sessionStorage.getItem('token');
                // sessionStorage.clear();
                window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/user/dashboard.html";
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



// edit user profile text
$(document).ready(function() {
    $(document).on('submit', '#EditUserProfileFormText', function(event) {
        event.preventDefault();
        var userProfileEditFormData = {
            // key         value
            FirstName: $('#editUserFirstName').val(),
            MiddleName: $('#editUserMiddleName').val(),
            LastName: $('#editUserLastName').val(),
            Address: $('#editUserAddress').val(),
            DOB: $('#editUserDob').val(),
            Phone: $('#editUserPhone').val(),
            Id: window.sessionStorage.getItem('user_id')
        }
        // console.log(userProfileEditFormData);
        $.ajax({
            url: 'http://localhost:3000/user/edit/userProfileData',
            method: 'put',
            contentType: 'application/json',
            data: JSON.stringify(userProfileEditFormData),
            success: function(result, status) {
                console.log(result);
                console.log(status);
                alert(result.message);
            },
            error: function(jqXHR, status) {
                console.log(jqXHR);
                // console.log(jqXHR.status);
                // console.log(jqXHR.responseJSON.message);
                console.log(status);
                // $('#message').html(jqXHR.responseJSON.message);
                console.log('Profile edit failed');
                alert(jqXHR.responseJSON.message);
            }
        });
    });
});



// user logout
$(document).ready(function() {
    $(document).on('click', '#userLogOutButton', function(event) {
        event.preventDefault();
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/login/userLogin.html";
    });
});