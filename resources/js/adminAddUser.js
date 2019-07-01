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
    })
} else {
    window.location.href = "../login/adminLogin.html";
}