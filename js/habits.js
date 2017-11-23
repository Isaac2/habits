var url = window.location.href;
var firebaseToken = url.split("?uid=")[1];

var app = angular.module("habits", []);

app.controller("TopBarController", function($scope) {
	$scope.title = "My Habits";
	$scope.menuOptions = [{title:"Habits"},{title:"Tasks"},{title:"Settings"}];
});

app.controller("PinboardController", function($scope, $http) {
	var APIurl = "https://guarded-anchorage-21945.herokuapp.com/decodeToken/"+firebaseToken;


	$http.get(APIurl)
	.then(function(response) {
	
		var userSignedIn = response.data;				
		var APIurl = "https://guarded-anchorage-21945.herokuapp.com/users/"+userSignedIn.uid;
		$http.get(APIurl)

		.then(function(response) {
			$scope.user = response.data;
			console.log(response.data)
		})

	})
});

app.controller("TaskController", function($scope){
	$scope.taskList = [ {name:"Repetir alv", value: 5}, {name:"ahora si", value: 10}];
});

/* CREATE HABIT
app.controller("HabitController", function($scope, $http) {
	var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/?token="+firebaseToken;


	var postData = {
		name: "play horizon",
		influence: "good",
		difficulty: "easy",
	}

	$http({
	    url: APIurl,
	    method: "POST",
	    data: postData,
	    dataType: 'json',
	    headers: {'Content-Type': 'application/JSON'}
	})
	.then(function(response) {
		console.log(response.data);
	})
	.catch(function(error){
		console.log(error);
	})	
})
*/

app.controller("HabitController", function($scope, $http) {
	var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/myHabits?token="+firebaseToken;

	$http.get(APIurl)
	.then(function(response) {
		addColorToHabitsArray(response.data)
		$scope.habitList = response.data;		
	})
	.catch(function (error){
		if(error.status === 401){
			alert("Tu sesión ha expirado");
			window.location = "login/index.html";
		}else{
			console.log(error);
		}
	})

	$scope.increaseScoreHabit = function(habit){
		var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/addScore/"+habit.id+"/?token="+firebaseToken;	

		$http.get(APIurl)
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function (error){
			console.log("Error substracting score to habit "+habit.id);
			console.log(error);
		})		
	};

	$scope.decreaseScoreHabit = function(habitID){
		var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/substractScore/"+habitID.id+"/?token="+firebaseToken;	

		$http.get(APIurl)
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function (error){
			console.log("Error adding score to habit "+habit.id);
			console.log(error);
		})	
	};
});

function addColorToHabitsArray(habitsArray){
	for(var i=0; i<habitsArray.length; i++){
		habitsArray[i] = calculateColor(habitsArray[i]);
	}
}

function initializeColors(){
	var firstRange = {
		lowerLimit: Number.MIN_SAFE_INTEGER,
		upperLimit: 0,
		color: "Red"
	}

	var OrangeColor = {
		lowerLimit: 0,
		upperLimit: 9,
		color: "Orange"
	}

	var YellowColor = {
		lowerLimit: 10,
		upperLimit: 39,
		color: "Yellow"
	}

	var GreenColor = {
		lowerLimit: 40,
		upperLimit: 49,
		color: "Green"
	}

	var lastRange = {
		lowerLimit: 50,
		upperLimit: Number.MAX_SAFE_INTEGER,
		color: "Blue"
	}	

	var colorsList = [];
	colorsList.push(firstRange);
	colorsList.push(OrangeColor);
	colorsList.push(YellowColor);	
	colorsList.push(GreenColor);
	colorsList.push(lastRange);

	return colorsList;
}

function calculateColor(habit){

	colorsList = initializeColors();

	for(var i = 0; i<colorsList.length; i++){
		if(habit.score >= colorsList[i].lowerLimit && habit.score <= colorsList[i].upperLimit){
			habit.color = colorsList[i].color;
		}
	}

	return habit;
}