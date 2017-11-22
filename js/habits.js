var url = window.location.href;
var firebaseToken = url.split("?uid=")[1];

var app = angular.module("habits", []);

app.controller("TopBarController", function($scope) {
	$scope.title = "My Habits";
	$scope.menuOptions = [{title:"Habits"},{title:"Tasks"},{title:"Settings"}];
});

app.controller("PinboardController", function($scope){
	$scope.user = {name : "Miguel Perez", level : "Bald Paladdin Level 1", currentHP: 15, maxHP : 20, currentXP: 0, maxXP: 200};
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
		console.log(response.data);
		$scope.habitList = response.data;
	})
	.catch(function (error){
		if(error.status === 401){
			alert("Tu sesión ha expirado");
			window.location = "login/index.html";
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

function calculateColor(habit){
	var firstRange = 0;
	var lastRange = 50;

	habit.color = "red";

	return habit;
}