
var config = {
  apiKey: "AIzaSyCpH0xgjS4VIZb9X8o_c3zMbHvn7zRDIrg",
  authDomain: "proyecto-final-arquitectura.firebaseapp.com",
  databaseURL: "https://proyecto-final-arquitectura.firebaseio.com",
  projectId: "proyecto-final-arquitectura",
  storageBucket: "proyecto-final-arquitectura.appspot.com",
  messagingSenderId: "619718630609"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    //window.location = '..'; //After successful login, user will be redirected to home.html
    console.log(user);
    userid = user.uid;
    firebase.auth().signOut().then(function() {
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    window.location = "../index.html?uid="+userid;
  }
});


var app = angular.module("login", []);

app.controller("logForm", function($scope) {
    $scope.log = function(){
      console.log("logging in");
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
            alert(errorCode +": "+errorMessage);
        });
        console.log('worked');
    }

    $scope.register = function(){
      console.log("registering");
      window.location="register"
    }
});
