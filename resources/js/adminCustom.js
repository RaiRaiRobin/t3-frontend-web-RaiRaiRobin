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

// admin Login
$(document).ready(function() {
    $(document).on('submit', '#AdminLoginForm', function(event) {
        event.preventDefault();
        const myFormData = {
            email: $('#LoginEmail').val(),
            password: $('#LoginPassword').val()
        }
        $.ajax({
            // v1 is the version , users is the route in backend 
            url: 'http://localhost:3000/admin/login',
            method: 'post',
            contentType: 'application/json',
            // headers: { 'Authorization' : window.localStorage.getItem('token')},
            data: JSON.stringify(myFormData),
            success: function(result, status) {
                // console.log(result);
                // $('#message').html(result.message);
                // console.log(result.token);
                window.localStorage.setItem('token', result.token);
                // console.log(result.info);
                window.sessionStorage.setItem('user_email', result.info.email);
                // window.sessionStorage.setItem('user_createdAt', result.info.createdAt);
                // window.sessionStorage.setItem('user_updatedAt', result.info.updatedAt);
                // var ses = window.sessionStorage.getItem('token');
                // sessionStorage.clear();
                window.location.href = "../admin/adminDashboard.html";
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



// user logout
$(document).ready(function() {
    $(document).on('click', '#userLogOutButton', function(event) {
        event.preventDefault();
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/login/adminLogin.html";
    });
});


// open modal in table list
$(document).ready(function() {
    $(document).on('click', '.openmodalclick', function(event) {
        event.preventDefault();
        // verify user token GET user's data
        var id = $(this).attr('data-id');
        $.ajax({
            url: 'http://localhost:3000/admin/user/info/' + id,
            method: 'get',
            dataType: 'json',
            headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
            success: function(result, status) {
                console.log(result.userInfo);
                $('#editUserFirstName').val(result.userInfo.first_name);
                $('#editUserMiddleName').val(result.userInfo.middle_name);
                $('#editUserLastName').val(result.userInfo.last_name);
                $('#editUserEmail').val(result.userInfo.email);
                $('#editUserPhone').val(result.userInfo.phone);
                $('#editUserAddress').val(result.userInfo.address);
                $('#editUserGender').val(result.userInfo.gender);
                $('#editUserDob').val(result.userInfo.dob);
                $('#editPhoto').attr('src', 'http://localhost:3000/images/profile/' + result.userInfo.photo);
                $('#myModal').modal('toggle');
            },
            error: function(jqXHR, status) {
                // console.log(jqXHR.status);
                console.log(status);
                console.log(jqXHR.responseJSON.message);
                // alert(jqXHR.responseJSON.message);
            }
        });
    });
});


$(document).ready(function() {
    $(document).on('submit', '#AddUserRegisterForm', function(event) {
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
                    // console.log(result);
                    console.log(status);
                    // alert(result.name);
                    // console.log(result.name);
                    registerprofiletextt(result.name);

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


    // delete user
    $(document).on('click', '.deleteUser', function(event) {
        event.preventDefault();
        var r = confirm("Delete user!");
        if (r == true) {
            var id = $(this).attr('data-id');
            $.ajax({
                url: 'http://localhost:3000/user/delete/' + id,
                method: 'delete',
                contentType: 'application/json',
                headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
                // data: JSON.stringify(userRegisterFormData),
                success: function(result, status) {
                    console.log(status);
                    alert(result.message);
                    window.location.href = "./adminTables.html";
                },
                error: function(jqXHR, status) {
                    console.log(status);
                    console.log(jqXHR.responseJSON.message);
                    alert(jqXHR.responseJSON.message);
                }
            });
        }
    });
});


// register profile text
function registerprofiletextt(name) {
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
        UserType: $('#UserType').val(),
        Photo: name,
        Password: password
    }
    // console.log(userRegisterFormData);
    $.ajax({
        url: 'http://localhost:3000/user/register/userFormDataa',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(userRegisterFormData),
        success: function(result, status) {
            // console.log(result);
            console.log(status);
            alert(result.message);
            window.location.href = "./addUser.html";
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR);
            // console.log(jqXHR.status);
            console.log(status);
            console.log(jqXHR.responseJSON.message);
            // $('#message').html(jqXHR.responseJSON.message);
            // console.log('data upload failed');
            alert(jqXHR.responseJSON.message);
        }
    });
}


// delete checkup
$(document).ready(function(){
    $(document).on('click', '.deleteCheckup', function(event) {
        event.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax({
                url: 'http://localhost:3000/checkup/delete/' + id,
                method: 'delete',
                contentType: 'application/json',
                headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
                success: function(result, status) {
                    console.log(status);
                    alert(result.message);
                    window.location.href = "./adminCheckupList.html";
                },
                error: function(jqXHR, status) {
                    console.log(status);
                    console.log(jqXHR.responseJSON.message);
                    alert(jqXHR.responseJSON.message);
                }
            });
    });
});