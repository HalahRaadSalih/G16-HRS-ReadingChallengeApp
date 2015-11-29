$("#newChallenge").on('click', function(){
    	window.location.replace("createChallenge.html");
});


$("#logoutUser").on('click', function(){
	ref.unauth();
	window.location.replace("login.html");
});