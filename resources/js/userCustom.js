

// show user register selected image for upload
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#ShowUserImage')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            }

            reader.readAsDataURL(input.files[0]);
        }
    
}


$(document).ready(function(){


    // User Register Submit
        $(document).on('submit', '#UserRegisterForm', function(event){
            event.preventDefault();
            var gender = $("input[name='UserGender']:checked").val();
            var password = $('#UserNewPassword').val();
            var retypePassword = $('#UserRetypeNewPassword').val();
            if (password == retypePassword) {
                const UserRegisterFormData = {
                    FirstName : $('#UserFirstName').val(),
                    MiddleName : $('#UserMiddleName').val(),
                    LastName : $('#UserLastName').val(),
                    Gender : gender,
                    Address : $('#UserAddress').val(),
                    DOB : $('#UserDob').val(),
                    Email : $('#UserEmail').val(),
                    Phone : $('#UserPhone').val(),
                    Photo : $('#UserPhoto').[0].files[0],
                    Password : password
                }
                console.log(UserRegisterFormData);
                $.ajax({
                    url: 'http://localhost:3000/user/register',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify(UserRegisterFormData),
                    success : function(result, status) {
                        console.log(result);
                        console.log(status);
                        // $('#message').html(result.message)
                    },
                    error : function(jqXHR, status) {
                        console.log(jqXHR.responseJSON.message);
                    }
                });
            }
            else {
                alert('Passwords did not match')
            }
        });





    });




    

