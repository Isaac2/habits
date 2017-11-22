var firebaseApp = firebase.initializeApp(firebaseConfig, "Auth");
firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDB = firebaseApp.database();

function checkFieldsSignUp(email, password, repeatedPassword){
    if(email === null){
        this.signUpWarningMessage = "Your email is invalid.";
        return false;
    }
    else if(password === null){
        this.signUpWarningMessage = "You need to add a password.";
        return false;
    }
    else if(password !== repeatedPassword){
        this.signUpWarningMessage = "Passwords are different.";
        return false;
    }
    else{
        return true;
    }
}

function SignUp(){
    var username = document.getElementById("usernameTextField").value;
    var email = document.getElementById("emailTextField").value;
    var password = document.getElementById("passwordTextField").value;
    var birthday = document.getElementById("birthdayTextField").value;
    var repeatedPassword = document.getElementById("repeatedPasswordTextField").value;

    var userCanRegister = checkFieldsSignUp(email, password, repeatedPassword);
    if(!userCanRegister){
        return;
    }

    const registeredUserInfo = {
        username: username,
        email: email,
        birthday: birthday,
        role: "user"
    };

    const promise = firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(function (result) {                    

        firebaseDB.ref('users/'+result.uid).set({
          username: registeredUserInfo.username,
          email: registeredUserInfo.email,
          birthday: registeredUserInfo.birthday,
          role: registeredUserInfo.role
        });

        alert("Your account has been created!");

    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if(error.code !== undefined){
            alert(errorMessage);
        }
    });
}