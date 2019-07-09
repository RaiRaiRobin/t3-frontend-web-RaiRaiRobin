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
                getallpatientlist();
            } else if (result.info.user_type == 'doctor') {
                $('#nurseSearchBar').attr('hidden', 'hidden');
                $('#vandoctor').removeAttr('hidden');
                $('#checkupRecords').removeAttr('hidden');
                getallpatientcheckuplist();
            } else {
                $('#tableList').attr('hidden', 'hidden');
                $('#PatientCheckuppList').removeAttr('hidden');
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



function getallpatientlist() {
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
                if (result.allUser[key].user_type == 'patient') {
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
                    $('#patientListTable').append('<tr class="openmodalclick" data-name="' + result.allUser[key].first_name + ' ' + result.allUser[key].middle_name + ' ' + result.allUser[key].last_name + '" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].id + '</td>\
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

// get patient list for doctor
function getallpatientcheckuplist() {
    // get all userlist
    $.ajax({
        url: 'http://localhost:3000/user/checkup/doctor',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
            $('#patientListTable').empty();
            // console.log(result.allUser[0]);
            for (key in result.allUser) {
                $('#patientListTable').append('<tr class="openmodalclickk" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].patient_id + '</td>\
                                  <td class="text-primary">' + result.allUser[key].name + '</td>\
                                  <td>\
                                     ' + result.allUser[key].blood_pressure + '\
                                  </td>\
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