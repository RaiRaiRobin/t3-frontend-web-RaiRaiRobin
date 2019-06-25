
var token = window.localStorage.getItem('token');
var id = window.sessionStorage.getItem('user_id');
// if (token ==null && id == null) {
if (token ==null) {
	window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/login/userLogin.html";
}



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
$('#userProfileName').html(first_name  + ' ' + middle_name + ' ' +last_name);
$('#userProfileType').html(user_type);
$('#userProfileImage').attr('src', 'http://localhost:3000/images/profile/'+photo);
$('#userNavbarProfileName').html(first_name  + ' ' + middle_name + ' ' +last_name);


$('#editUserFirstName').val(first_name);
$('#editUserMiddleName').val(middle_name);
$('#editUserLastName').val(last_name);
$('#editUserEmail').val(email);
$('#editUserPhone').val(phone);
$('#editUserAddress').val(address);
$('#editUserGender').val(gender);
$('#editUserDob').val(dob);
