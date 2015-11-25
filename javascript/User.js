

var User = function(firstName, lastName, email){
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;

	//challenges are initial empty
	this.challenges = [];
	this.finishedChallenges = [];
	this.unfinishedCallenges = [];

	//user id to be obtained and set after a 
	// successful firebase create user request
	this.userID = "";
}

// Role: add challenge to user
User.prototype.addChallenge = function(challenge) {
	// check if user has an ID
	if(this.userID){
		//if the user does indeed have an ID, then use the id to add challeneg
		var ref = new Firebase("https://amber-inferno-898.firebaseio.com/users/"+this.userID+"/challenges");

		//add challenge to firebase
		ref.set(challenge);

		// check if challenge is allready added to user challenges
		// if not, then add it to user challenges
		if(this.challenges.indexOf(challenge) === -1){
			this.challenges.push(challenge);
		}
	}
};

User.prototype.removeChallenge = function(challenge) {
	// check if user has an ID
	if(this.userID){

		//remove challenge from challenges object
		//remove challenge from firebase
		/* insert code here */

	}
};

User.prototype.editChallenge = function(challenge) {
	// check if user has an ID
	if(this.userID){

		//edit challenge for user
		//send the updated challenge back to firebase
		/* insert code here*/

	}
};