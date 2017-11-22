
var config = {
  apiKey: "AIzaSyCpH0xgjS4VIZb9X8o_c3zMbHvn7zRDIrg",
  authDomain: "proyecto-final-arquitectura.firebaseapp.com",
  databaseURL: "https://proyecto-final-arquitectura.firebaseio.com",
  projectId: "proyecto-final-arquitectura",
  storageBucket: "proyecto-final-arquitectura.appspot.com",
  messagingSenderId: "619718630609"
};

firebase.initializeApp(config);

var app = angular.module("login", []);

app.controller("logForm", function($scope) {
    $scope.register = function(){
        console.log("registering");
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
});
