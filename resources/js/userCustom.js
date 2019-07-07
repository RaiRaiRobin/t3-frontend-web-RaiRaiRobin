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

function readURLL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#editPhoto')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        var src = $('#editPhoto').attr('data-id');
        $('#editPhoto').removeAttr('src');
        $('#editPhoto').attr('src', src);
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
            window.localStorage.clear();
            window.sessionStorage.clear();
            window.localStorage.setItem('token', result.token);
            window.location.href = "../user/dashboard.html";
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
                // console.log(result.info);
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
                window.location.href = "../user/dashboard.html";
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
        var userRegisterFormPhotoval = $('#editprofilepicture').val();
        if (userRegisterFormPhotoval == '') {
            edituseprofiletext(name, oldPhotoName);
        } else {
            var userRegisterFormPhoto = $('#editprofilepicture')[0].files[0];
            var oldPhotoName = $('#editPhoto').attr('data-name');
            var formdata = new FormData();
            formdata.append("UserPhoto", userRegisterFormPhoto);
            // ajax for storing photo of user
            $.ajax({
                url: 'http://localhost:3000/user/update/userPhoto',
                method: 'put',
                contentType: false,
                processData: false,
                headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
                data: formdata,
                dataType: 'json',
                success: function(result, status) {
                    // console.log(result);
                    console.log(status);
                    edituseprofiletext(result.name, oldPhotoName);

                    // console.log(result.message)
                },
                error: function(jqXHR, status) {
                    // console.log(jqXHR.responseJSON.message);
                    console.log('upload failed');
                }
            });
        }
    });
});


// edit user profile text
function edituseprofiletext(name, oldPhotoName) {
    var userProfileEditFormData = {
        // key         value
        FirstName: $('#editUserFirstName').val(),
        MiddleName: $('#editUserMiddleName').val(),
        LastName: $('#editUserLastName').val(),
        Address: $('#editUserAddress').val(),
        DOB: $('#editUserDob').val(),
        Phone: $('#editUserPhone').val(),
        Id: window.sessionStorage.getItem('user_id'),
        imageName: name,
        oldImageName: oldPhotoName
    }
    // console.log(userProfileEditFormData);
    $.ajax({
        url: 'http://localhost:3000/user/edit/userProfileData',
        method: 'put',
        contentType: 'application/json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        data: JSON.stringify(userProfileEditFormData),
        success: function(result, status) {
            // console.log(result);
            console.log(status);
            // console.log(result.info);
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
            alert(result.message);
            window.location.href = "./user.html";
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
            // console.log(jqXHR.status);
            // console.log(jqXHR.responseJSON.message);
            console.log(status);
            // $('#message').html(jqXHR.responseJSON.message);
            // console.log('Profile edit failed');
            alert(jqXHR.responseJSON.message);
        }
    });
}




// user logout
$(document).ready(function() {
    $(document).on('click', '#userLogOutButton', function(event) {
        event.preventDefault();
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = "../login/userLogin.html";
    });
});


// open modal in table list
$(document).ready(function() {
    $(document).on('click', '.openmodalclick', function(event) {
        event.preventDefault();
        $('#myModal').modal('toggle');

    });
});


// edit Profile Button
$(document).on('click', '#editProfileButton', function(event) {
    event.preventDefault();
    $('#editUserFirstName').removeAttr('disabled');
    $('#editUserFirstName').focus();
    $('#editUserMiddleName').removeAttr('disabled');
    $('#editUserLastName').removeAttr('disabled');
    $('#editUserPhone').removeAttr('disabled');
    $('#editUserAddress').removeAttr('disabled');
    $('#editUserDob').removeAttr('disabled');
    $('#profilepictureedit').removeAttr('hidden');
    $('#cancelEditProfileButton').removeAttr('hidden');
    $('#submitEdit').removeAttr('hidden');
    $('#editProfileButton').attr('hidden', 'hidden');
});

// cancel edit Profile Button
$(document).on('click', '#cancelEditProfileButton', function(event) {
    event.preventDefault();
    $('#editUserFirstName').attr('disabled', 'disabled');
    $('#editUserMiddleName').attr('disabled', 'disabled');
    $('#editUserLastName').attr('disabled', 'disabled');
    $('#editUserPhone').attr('disabled', 'disabled');
    $('#editUserAddress').attr('disabled', 'disabled');
    $('#editUserDob').attr('disabled', 'disabled');
    $('#profilepictureedit').attr('hidden', 'hidden');
    $('#cancelEditProfileButton').attr('hidden', 'hidden');
    $('#submitEdit').attr('hidden', 'hidden');
    $('#editProfileButton').removeAttr('hidden');
});


// patielt List Search Bar
$(document).on('keyup', '#patieltListSearchBar', function(event) {
    event.preventDefault();
    var text = $('#patieltListSearchBar').val().trim();
    if (text != '') {
        var userProfileEditFormData = {
            // key         value
            search: text
        }
        // console.log(userProfileEditFormData);
        $.ajax({
            url: 'http://localhost:3000/user/search',
            method: 'post',
            contentType: 'application/json',
            headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
            data: JSON.stringify(userProfileEditFormData),
            success: function(result, status) {
                $('#patientListTable').empty();
                for (key in result.allUser) {
                // console.log(result[key].userName);
                // console.log(result.allUser[key].dob);
                var date = result.allUser[key].dob;
                var arr1 = date.split('-');
                var arr2 = arr1[1].split(' ');
                var arr3 = arr1[2].split(' ');
                var dob = arr1[0] + ', ' + arr2 + ', ' + arr3;

                function calculate_age(dob) {
                    var diff_ms = Date.now() - dob.getTime();
                    var age_dt = new Date(diff_ms);
                    return Math.abs(age_dt.getUTCFullYear() - 1970);
                }
                var datee = calculate_age(new Date(1998, 9, 23))
                // console.log(datee);
                $('#patientListTable').append('<tr class="openmodalclick"><td>' + result.allUser[key].id + '</td>\
                                  <td class="text-primary">' + result.allUser[key].first_name + ' ' + result.allUser[key].middle_name + ' ' + result.allUser[key].last_name + '</td>\
                                  <td>\
                                     ' + result.allUser[key].email + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].address + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].phone + '\
                                  </td>\
                                  <td>\
                                    ' + datee + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].gender + '\
                                  </td>\
                                </tr>');
            }
            },
            error: function(jqXHR, status) {
                console.log(jqXHR.responseJSON.message);
                console.log(status);
                // alert(jqXHR.responseJSON.message);
            }
        });
    }
    else{
        getallpatientlistt();
    }
});

function getallpatientlistt(){
    // get all userlist
    $.ajax({
        url: 'http://localhost:3000/user/list',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
            $('#patientListTable').empty();
            // console.log(result.allUser[0]);
            for (key in result.allUser) {
                // console.log(result[key].userName);
                // console.log(result.allUser[key].dob);
                var date = result.allUser[key].dob;
                var arr1 = date.split('-');
                var arr2 = arr1[1].split(' ');
                var arr3 = arr1[2].split(' ');
                var dob = arr1[0] + ', ' + arr2 + ', ' + arr3;

                function calculate_age(dob) {
                    var diff_ms = Date.now() - dob.getTime();
                    var age_dt = new Date(diff_ms);
                    return Math.abs(age_dt.getUTCFullYear() - 1970);
                }
                var datee = calculate_age(new Date(1998, 9, 23))
                // console.log(datee);
                $('#patientListTable').append('<tr class="openmodalclick"><td>' + result.allUser[key].id + '</td>\
                                  <td class="text-primary">' + result.allUser[key].first_name + ' ' + result.allUser[key].middle_name + ' ' + result.allUser[key].last_name + '</td>\
                                  <td>\
                                     ' + result.allUser[key].email + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].address + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].phone + '\
                                  </td>\
                                  <td>\
                                    ' + datee + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].gender + '\
                                  </td>\
                                </tr>');
            }
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
            // console.log(jqXHR.status);
            // console.log(jqXHR.responseJSON.message);
            console.log(status);
            // alert(jqXHR.responseJSON.message);
        }
    });
}