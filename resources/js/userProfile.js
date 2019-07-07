var token = window.localStorage.getItem('token');

var id = window.sessionStorage.getItem('user_id');
var first_name = window.sessionStorage.getItem('user_first_name');
var middle_name = window.sessionStorage.getItem('user_middle_name');
var last_name = window.sessionStorage.getItem('user_last_name');
var user_type = window.sessionStorage.getItem('user_user_type');
var gender = window.sessionStorage.getItem('user_gender');
var dob = window.sessionStorage.getItem('user_dob');
var email = window.sessionStorage.getItem('user_email');
var address = window.sessionStorage.getItem('user_address');
var phone = window.sessionStorage.getItem('user_phone');
var photo = window.sessionStorage.getItem('user_photo');
$('#userProfileName').html(first_name + ' ' + middle_name + ' ' + last_name);
$('#userProfileType').html(user_type);
$('#userProfileImage').attr('src', 'http://localhost:3000/images/profile/' + photo);
$('#editPhoto').attr('src', 'http://localhost:3000/images/profile/' + photo);
$('#editPhoto').attr('data-id', 'http://localhost:3000/images/profile/' + photo);
$('#editPhoto').attr('data-name', photo);
$('#openUserImageInNewTab').attr('href', 'http://localhost:3000/images/profile/' + photo);
$('#userNavbarProfileName').html(first_name + ' ' + middle_name + ' ' + last_name);

$('#editUserFirstName').val(first_name);
$('#editUserMiddleName').val(middle_name);
$('#editUserLastName').val(last_name);
$('#editUserEmail').val(email);
$('#editUserPhone').val(phone);
$('#editUserAddress').val(address);
$('#editUserGender').val(gender);
$('#editUserDob').val(dob);


if (token != null) {
    // verify user token GET user's data
    $.ajax({
        url: 'http://localhost:3000/token/verify',
        method: 'post',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
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
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR);
            window.localStorage.clear();
            window.sessionStorage.clear();
            alert('Invalid Token');
            window.location.href = "../login/userLogin.html";
        }
    })
} else {
    window.location.href = "../login/userLogin.html";
}