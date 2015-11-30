
	console.log('here');
	$("#newChallenge").on('click', function(){
    	window.location.replace("createChallenge.html");
	});


	$("#logoutUser").on('click', function(){
		ref.unauth();
		window.location.replace("index.html");
	});

  var challengeOuput = $('#userChallenges');

	var refChallenges = new Firebase("https://amber-inferno-898.firebaseio.com/challenges");

	refChallenges.on("value", function(snapshot) {
    var data = snapshot.val();
  	console.log(data);

    for(var key in data){

      console.log(key + ' : ' + data[key]);
        challengeOuput.append(makeChallengeLayout(new Challenge(data[key]["name"], 'Disrupt four dollar toast cronut, normcore schlitz YOLO distillery everyday carry tofu post-ironic trust fund affogato cold-pressed vegan. Franzen forage banjo, single-origin coffee authentic mumblecore art party viral cornhole quinoa vinyl ramps. Occupy cray yr slow-carb')));

    }

	}, 
	function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
	});



function makeChallengeLayout (challenge) {
  var challengeContainer = $("<div>").addClass("col-md-3");
 

  var challengeTitle = $('<h4>').html(challenge.name);

  var challengeDescription = $("<p>");
  challengeDescription.html(challenge.description.substr(0,200));
 
  var challengeViewButton = $("<a>").addClass("btn btn-info btn-block");
  challengeViewButton.html("View Challenge");

  challengeViewButton.on('click', function(event){
    event.preventDefault();
    

  });

  var challengeProgress = $('<div class="progress"></div>');
  var progressBar =  $('<div class="progress-bar" role="progressbar" aria-valuenow="2" aria-valuemin="10" aria-valuemax="100" style="min-width: 2em; width: 2%;"></div>');
  progressBar.html("2%");
  challengeProgress.append(progressBar);

  challengeContainer.append(challengeTitle, challengeDescription, challengeProgress ,challengeViewButton);

  return challengeContainer;
}