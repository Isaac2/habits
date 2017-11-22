var firebaseApp = firebase.initializeApp(firebaseConfig, "Auth");
firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();

firebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
        window.location = "../index.html?uid="+user.uid;
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