var ref = new Firebase("https://amber-inferno-898.firebaseio.com/users");
var CURRENT_USER_ID;

window.onload = function(){

  $("#createAccount").on('click', function(){
      return false;
  });

  $("#createAccount").on('click', createUser);

  $("#loginUser").on('click', function(){
      return false;
    });

  $("#loginUser").on('click', loginUser);
  $("#navBarLogin").on('click', function(){
      window.location.replace("../index.html");
      return false;
  });
    
} 
    

	function createUser(){

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#userEmail").val();

    var user = new User(firstName, lastName, email);

			ref.createUser({

  			email    : email,
  			password : $("#userPassword").val(),
        
			   }, function(error, userData) {

  			if (error) {
          console.log("Error creating user:", error);
  			} 

  			else {
          CURRENT_USER_ID = userData.uid;
          var someObj = {};
          var userID = userData.uid;
          
          user.userID = userID;
          someObj[userID] = user;

          ref.set(someObj);

          loginUser();
          
  			}
			});

		}

    


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
            CURRENT_USER_ID = authData.uid;
            console.log('CURRENT_USER_ID : '+CURRENT_USER_ID);
            console.log("Authenticated successfully with payload:", authData);
            window.location.replace("pages/userChallenges.html");

            }
          }

          ref.authWithPassword({
            email    : $("#userEmail").val(),
            password : $("#userPassword").val(),
            rememberMe: $("#rememberMe").val()

            }, authHandler);
    }