var ref = new Firebase("https://amber-inferno-898.firebaseio.com/");

    $("#createAccount").on('click', function(){
      return false;
    });

    $("#createAccount").on('click', createUser);
  	

		function createUser(){
      console.log('inside createUser');
			ref.createUser({
  			email    : $("#userEmail").val(),
  			password : $("#userPassword").val()
			}, function(error, userData) {
  			if (error) {
    		console.log("Error creating user:", error);
  			} 
  			else {
    		console.log("Successfully created user account with uid:", userData.uid);
  			}
			});	
		}