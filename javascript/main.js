var ref = new Firebase("https://amber-inferno-898.firebaseio.com/");

    $("#createAccount").on('click', function(){
      return false;
    });

    $("#createAccount").on('click', createUser);
  	

		function createUser(){

			ref.createUser({

  			email    : $("#userEmail").val(),
  			password : $("#userPassword").val()
			   }, function(error, userData) {

  			if (error) {
    		  console.log("Error creating user:", error);
  			} 

  			else {
          var successAlert = $('<div class="alert alert-success" role="alert">Successfully created user!</div>');
          $('form').empty();
          $('form').append(successAlert);
  			}
			});	
		}