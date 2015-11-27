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

    $("#loginUser").on('click', function(){
      return false;
    });

    $("#loginUser").on('click', loginUser);


    function loginUser(){
      function authHandler(error, authData) {
           if (error) {
            switch (error.code) {
              case "INVALID_EMAIL":
                $("#userEmail").toggleClass("hasError");
                break;
              case "INVALID_PASSWORD":
                console.log("The specified user account password is incorrect.");
                break;
              case "INVALID_USER":
                console.log("The specified user account does not exist.");
                break;
              default:
                console.log("Error logging user in:", error);
            }
          }
           else {
            console.log("Authenticated successfully with payload:", authData);
            window.location.replace("index.html");

            }
          }

          ref.authWithPassword({
            email    : $("#userEmail").val(),
            password : $("#userPassword").val()
            }, authHandler);
    }