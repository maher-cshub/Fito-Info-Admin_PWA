import firebase_app from "../util.js"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {getDatabase , ref , get,  push , set , update , remove , child} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { validatePassword , validateEmail, validateUserName} from "./validation.js";


//handle sign-up
const sign_up = document.querySelector("#sign-up form");
sign_up.addEventListener("submit",SignUp);

function isEmpty(value){
    if (value.length == 0){
        return true
    }
    else{
        return false
    }
}
async function SignUp(evt){
    evt.preventDefault();
    const username = sign_up.elements["sign-up-username"].value;
    const email = sign_up.elements["sign-up-email"].value;
    const password = sign_up.elements["sign-up-password"].value;
    const confirmpassword = sign_up.elements["confirm-password"].value;
    const database = getDatabase(firebase_app)
    const usernames_ref = ref(database,"users/usernames");
    const check = await get(usernames_ref)
    const usernames = Object.values(check.val())

    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmpassword)){
        alert("please fill all fileds !")
        return
    }
    if (validateEmail(email) == false){
        alert("Wrong email format ,please enter a valid email");
        return
    }
    if(validatePassword(password) == false){
        alert("invalid password , password must be at least 8 characters and must contain at least (one UPPERCASE ,one lowercase , one digit, one special character) ")
        return
    }
    if(password != confirmpassword){
        alert("passwords doesnt match !!!");
        return
    }

    if(validateUserName(username) == false)
    {
        alert("username invalid !!! (username must be at least 2 characters and less than 16 characters)");
        return
    }

    if (usernames.includes(username)){
        alert("username already taken ,try using another username !");
        return 
    }


    //sign up firebase
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        sendEmailVerification(user);
        console.log(user)
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    
    //check if username exists
}
/*
const database = getDatabase(firebase_app);
console.log(firebase_app)
console.log(getAuth(firebase_app))
console.log(database)*/