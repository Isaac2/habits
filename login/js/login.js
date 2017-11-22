
var config = {
  apiKey: "AIzaSyCpH0xgjS4VIZb9X8o_c3zMbHvn7zRDIrg",
  authDomain: "proyecto-final-arquitectura.firebaseapp.com",
  databaseURL: "https://proyecto-final-arquitectura.firebaseio.com",
  projectId: "proyecto-final-arquitectura",
  storageBucket: "proyecto-final-arquitectura.appspot.com",
  messagingSenderId: "619718630609"
};

var firebaseApp = firebase.initializeApp(config, "Auth");
firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

firebaseAuth.onAuthStateChanged(user => {
  if(user) {
    //window.location = '..'; //After successful login, user will be redirected to home.html
    console.log(user);
    userid = user.uid;
    firebaseAuth.signOut().then(function() {
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    window.location = "../index.html?uid="+userid;
  }
});

function logIn(){
    var email = document.getElementById("emailTextField").value;
    var password = document.getElementById("passwordTextField").value;

    if(email === null || password === null){
        alert("These fields cannot be empty.");
        return;
    }            

    const promise = firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(function (result) {
            //console.log(result)
    })                                
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if(error.code !== undefined){
                alert(errorMessage);
            }
            else{
                errorMessage = "There is no user record corresponding to this identifier.";
                alert(errorMessage);
            }
    });

    password = "";
}

function logOut(){
    firebaseAuth.signOut();
}