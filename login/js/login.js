function goToHome(idToken){
    window.location = "../index.html?uid="+idToken;
}

function logIn(){
    var email = document.getElementById("emailTextField").value;
    var password = document.getElementById("passwordTextField").value;

    if(email === null || password === null){
        alert("These fields cannot be empty.");
        return;
    }            

    const promise = firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(function (result) {

            firebaseAuth.currentUser.getIdToken(/* forceRefresh */ true)
                .then(function(idToken) {
                    goToHome(idToken);
                }).catch(function(error) {
                    // Handle error
                });
                
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