
var token = window.localStorage.getItem('token');
var id = window.sessionStorage.getItem('user_id');
if (token !=null && id != null) {
	window.location.href = "file:///home/robin/Documents/WebApiAssignmentProject/t3-frontend-web-RaiRaiRobin/views/user/dashboard.html";
}