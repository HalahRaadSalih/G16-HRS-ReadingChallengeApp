var User = function(firstName, lastName, email){
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.challenges = [];
	this.finishedChallenges = [];
	this.unfinishedCallenges = [];
	this.userID = "";
}


User.prototype.addChallenge = function(challenge) {
	if(this.userID){
		var ref = new Firebase("https://amber-inferno-898.firebaseio.com/users/"+this.userID+"/challenges");
		ref.set(challenge);
	}
};

User.prototype.removeChallenge = function(first_argument) {
	
};

User.prototype.editChallenge = function(first_argument) {
	
};