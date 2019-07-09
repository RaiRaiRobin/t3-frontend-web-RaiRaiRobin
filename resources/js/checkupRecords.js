
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
$('#userNavbarProfileName').html(first_name + ' ' + middle_name + ' ' + last_name);


if (token != null) {
    // verify user token GET user's data
    $.ajax({
        url: 'http://localhost:3000/token/verify',
        method: 'post',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
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
            if (result.info.user_type == 'nurse') {
                $('#nurseSearchBar').removeAttr('hidden');
                $('#navnurse').removeAttr('hidden');
                $('#checkupRecords').removeAttr('hidden');
                getallcheckuprecord();
            } else if (result.info.user_type == 'doctor') {
                $('#nurseSearchBar').attr('hidden', 'hidden');
                $('#vandoctor').removeAttr('hidden');
                $('#checkupRecords').removeAttr('hidden');
                getallcheckuprecord();
            } else {
                $('#tableList').attr('hidden', 'hidden');
                $('#PatientCheckuppList').removeAttr('hidden');
                // patientList();
            }
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR);
            window.localStorage.clear();
            window.sessionStorage.clear();
            alert('Invalid Token');
            window.location.href = "../login/userLogin.html";
        }
    });

} else {
    window.location.href = "../login/userLogin.html";
}


// get all patient checkup record
function getallcheckuprecord(){
    $.ajax({
        url: 'http://localhost:3000/patient/checkupRecord/',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
            $('#patientCheckListTable').empty();
            // console.log(result.allUser[0]);
            for (key in result.allUser) {
                    $('#patientCheckListTable').append('<tr><td>' + result.allUser[key].id + '</td>\
                                  <td class="text-primary">' + result.allUser[key].name + '</td>\
                                  <td class="text-primary">' + result.allUser[key].blood_pressure + '</td>\
                                  <td>\
                                     ' + result.allUser[key].body_temperature + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].sugar_level + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].bmi + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].cholesterol_level + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].prescription + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].description + '\
                                  </td>\
                                  <td>\
                                    ' + result.allUser[key].createdAt + '\
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