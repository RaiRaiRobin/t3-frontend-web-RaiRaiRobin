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
        window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/login/userLogin.html";
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
                // console.log(result.userInfo[0].first_name);
                // console.log(result.allUser[0]);
                // for (key in result.allUser) {
                //     // console.log(result[key].userName);
                //     // console.log(result.allUser[key].dob);
                //     var date = result.allUser[key].dob;
                //     var arr1 = date.split('-');
                //     var arr2 = arr1[1].split(' ');
                //     var arr3 = arr1[2].split(' ');
                //     var dob = arr1[0] + ', ' + arr2 + ', ' + arr3;

                //     function calculate_age(dob) {
                //         var diff_ms = Date.now() - dob.getTime();
                //         var age_dt = new Date(diff_ms);
                //         return Math.abs(age_dt.getUTCFullYear() - 1970);
                //     }
                //     var datee = calculate_age(new Date(1998, 9, 23))
                //     // console.log(datee);
                //     $('#patientListTable').append('<tr class="openmodalclick" data-id="' + result.allUser[key].id + '"><td>' + result.allUser[key].id + '</td>\
                //                       <td class="text-primary">' + result.allUser[key].first_name + ' ' + result.allUser[key].middle_name + ' ' + result.allUser[key].last_name + '</td>\
                //                       <td>\
                //                          ' + result.allUser[key].email + '\
                //                       </td>\
                //                       <td>\
                //                          ' + result.allUser[key].address + '\
                //                       </td>\
                //                       <td>\
                //                          ' + result.allUser[key].phone + '\
                //                       </td>\
                //                       <td>\
                //                         ' + datee + '\
                //                       </td>\
                //                       <td>\
                //                         ' + result.allUser[key].gender + '\
                //                       </td>\
                //                     </tr>');
                // }
                $('#myModal').modal('toggle');
            },
            error: function(jqXHR, status) {
                console.log(jqXHR);
                // console.log(jqXHR.status);
                // console.log(jqXHR.responseJSON.message);
                console.log(status);
                // alert(jqXHR.responseJSON.message);
            }
        });
    });
});


