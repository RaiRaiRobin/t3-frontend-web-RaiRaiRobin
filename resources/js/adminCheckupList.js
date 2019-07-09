var token = window.localStorage.getItem('token');

var id = window.sessionStorage.getItem('user_id');
var email = window.sessionStorage.getItem('user_email');

if (token != null) {
    // verify user token GET user's data
    $.ajax({
        url: 'http://localhost:3000/admin/token/verify',
        method: 'post',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
            window.sessionStorage.setItem('user_id', result.info.id);
            window.sessionStorage.setItem('user_email', result.info.email);
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR);
            window.localStorage.clear();
            window.sessionStorage.clear();
            alert('Invalid Token');
            window.location.href = "../login/adminLogin.html";
        }
    });


    $.ajax({
        url: 'http://localhost:3000/admin/checkup/list',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
        $('#patientCheckupListTable').empty();
            // console.log(result.allUser[0]);
            for (key in result.allUser) {
                                $('#patientCheckupListTable').append('<tr><td>' + result.allUser[key].patient_id + '</td>\
                                  <td class="text-primary">' + result.allUser[key].name + '</td>\
                                  <td>\
                                     ' + result.allUser[key].blood_pressure + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].body_temperature + '\
                                  </td>\
                                  <td>\
                                     ' + result.allUser[key].sugar + '\
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
                                  <td>\
                                    <button data-id="' + result.allUser[key].id + '" class="btn btn-danger deleteCheckup" type="button">Delete</button>\
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
} else {
    window.location.href = "../login/adminLogin.html";
}

