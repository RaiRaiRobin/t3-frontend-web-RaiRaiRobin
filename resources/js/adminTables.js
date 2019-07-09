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

    // get all Patientlist
    $.ajax({
        url: 'http://localhost:3000/admin/patients/list',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
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
                $('#patientListTable').append('<tr class="openmodalclick" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].id + '</td>\
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
                                  <td>\
                                    <button data-id="'+result.allUser[key].id+'" class="btn btn-danger deleteUser" type="button">Delete</button>\
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

    // get all Doctor list
    $.ajax({
        url: 'http://localhost:3000/admin/doctors/list',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
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
                $('#doctorListTable').append('<tr class="openmodalclick" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].id + '</td>\
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
                                  <td>\
                                    <button data-id="'+result.allUser[key].id+'" class="btn btn-danger deleteUser" type="button">Delete</button>\
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

    // get all Nurse list
    $.ajax({
        url: 'http://localhost:3000/admin/nurses/list',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer ' + window.localStorage.getItem('token') },
        success: function(result, status) {
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
                $('#nurseListTable').append('<tr class="openmodalclick" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].id + '</td>\
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
                                  <td>\
                                    <button data-id="'+result.allUser[key].id+'" class="btn btn-danger deleteUser" type="button">Delete</button>\
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