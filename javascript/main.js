var ref = new Firebase("https://amber-inferno-898.firebaseio.com/users");
    $("#createAccount").on('click', function(){
      return false;
    });

    $("#createAccount").on('click', createUser);
  	

		function createUser(){

			ref.createUser({

  			email    : $("#userEmail").val(),
  			password : $("#userPassword").val(),
        
			   }, function(error, userData) {

  			if (error) {
          console.log("Error creating user:", error);
  			} 

  			else {
          var someObj = {};

          var userID = userData.uid;
          var firstName = $("#firstName").val();
          var lastName = $("#lastName").val();
          var email = $("#userEmail").val();

          var user = new User(firstName, lastName, email);
          user.userID = userID;

          someObj[userID] = user;

          ref.set(someObj);
          
  			}
			});	
		}