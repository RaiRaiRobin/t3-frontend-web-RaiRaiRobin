
var token = window.localStorage.getItem('token');

var id = window.sessionStorage.getItem('user_id');
var email = window.sessionStorage.getItem('user_email');

if (token != null) {
    // verify user token GET user's data
    $.ajax({
        url: 'http://localhost:3000/admin/token/verify',
        method: 'post',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
            window.sessionStorage.setItem('user_id', result.info.id);
            window.sessionStorage.setItem('user_email', result.info.email);
            getPatientsCount();
            getDoctorsCount();
            getNursesCount();
            getCheckupsCount();
        },
        error: function(jqXHR, status) {
            // console.log(jqXHR);
            window.localStorage.clear();
            window.sessionStorage.clear();
            alert('Invalid Token');
            window.location.href = "../login/adminLogin.html";
        }
    })
} else {
    window.location.href = "../login/adminLogin.html";
}


// get patients count
function getPatientsCount(){
    $.ajax({
        url: 'http://localhost:3000/admin/count/patient',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
            // console.log(result.count);
            var count = result.count;
            $('#patientCount').html(count);
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
        }
    })
}

function getDoctorsCount(){
    $.ajax({
        url: 'http://localhost:3000/admin/count/doctor',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
            // console.log(result.count);
            var count = result.count;
            $('#DoctorCount').html(count);
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
        }
    })
}

function getNursesCount(){
    $.ajax({
        url: 'http://localhost:3000/admin/count/nurse',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
            // console.log(result.count);
            var count = result.count;
            $('#NurseCount').html(count);
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
        }
    })
}

function getCheckupsCount(){
    $.ajax({
        url: 'http://localhost:3000/admin/count/checkup',
        method: 'get',
        dataType: 'json',
        headers: { authorization: 'Bearer '+window.localStorage.getItem('token') },
        success: function(result, status) {
            // console.log(result.count);
            var count = result.count;
            $('#CheckupCount').html(count);
        },
        error: function(jqXHR, status) {
            console.log(jqXHR);
        }
    })
}