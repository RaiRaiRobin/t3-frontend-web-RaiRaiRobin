

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
                var userRegisterFormData = {
                    // key         value
                    FirstName : $('#UserFirstName').val(),
                    MiddleName : $('#UserMiddleName').val(),
                    LastName : $('#UserLastName').val(),
                    Gender : gender,
                    Address : $('#UserAddress').val(),
                    DOB : $('#UserDob').val(),
                    Email : $('#UserEmail').val(),
                    Phone : $('#UserPhone').val(),
                    Password : password
                }
                var userRegisterFormPhoto = {Photo : $('#UserPhoto')[0].files[0]}
                var formdata = new FormData();
                    // formdata.append(1,userRegisterFormPhoto);
                for(key in userRegisterFormPhoto){
                    formdata.append(key,userRegisterFormPhoto[key]);
                }
                console.log(formdata);  
                // ajax for storing photo of user
                $.ajax({
                    url: 'http://localhost:3000/user/register/userPhoto',
                    method: 'POST',
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    data: formdata,
                    success : function(result, status) {
                        console.log(result);
                        console.log(status);
                        // console.log(result.message)
                    },
                    error : function(jqXHR, status) {
                        // console.log(jqXHR.responseJSON.message);
                    }
                });
                // ajax for registerning data of user
                $.ajax({
                    url: 'http://localhost:3000/user/register/text',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(userRegisterFormData),
                    success : function(result,status){
                        console.log(result);
                        console.log(status);
                        // console.log(result.message);
                    },
                    error : function (jqXHR,status){ 
                        // console.log(jqXHR.responseJSON.message);
                    }       
                });
            }
            else {
                alert('Passwords did not match')
            }
        });





    });




    

