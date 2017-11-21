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

app.controller("HabitController", function($scope) {
  $scope.habitList = [ {name:"Repetir alv", value: 5}, {name:"ahora si", value: 10}];
});
