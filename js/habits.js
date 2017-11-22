var firebaseApp = firebase.initializeApp(firebaseConfig, "Auth");
firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();

var url = new URL(window.location.href);
var uid = url.searchParams.get("uid");

if (uid==null) {
	window.location="login";
}

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

app.controller("HabitController", function($scope, $http) {

	/*
	var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/myHabits";

	$http.get(APIurl)
	.then(function(response) {
		console.log(response.data);
	});
	*/


	var APIurl = "https://damp-fjord-81017.herokuapp.com/habits/?token="+getUserToken();

	postData = {
		name: "play horizon",
		influence: "good",
		difficulty: "easy",
	}

	$http({
	    url: APIurl,
	    method: "POST",
	    data: postData,
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function(response) {
		console.log(response.data);
	})
	.catch(function(error){
		console.log(error);
	})

	$scope.habitList = [ {name:"Repetir alv", value: 5, color: "blue"}, {name:"ahora si", score: 10, color: "red"}];
});

function calculateColor(habit){

	var firstRange = 0;
	var lastRange = 50;

	return habit;

}

function getUserToken(){
	console.log(firebaseAuth);
	firebaseAuth.currentUser.getToken(/* forceRefresh */ true)
		.then(function(idToken) {
			return idToken;
		}).catch(function(error) {
		    // Handle error
	});
}