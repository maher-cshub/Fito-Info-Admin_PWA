import firebase_app from "../util.js"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,updateProfile, sendEmailVerification, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {getDatabase , ref , get , set ,push, update , remove , child} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { validatePassword , validateEmail, validateUserName} from "./validation.js";


//handle sign-up
const sign_up = document.querySelector("#sign-up form");
const sign_in = document.querySelector("#sign-in form");
const reset_password = document.querySelector("#sign-in > form > div.form-actions > p:nth-child(2) > a");
sign_up.addEventListener("submit",SignUp);
sign_in.addEventListener("submit",SignIn);
reset_password.addEventListener("click",ResetPassword);

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
    console.log(check)
    let usernames = null;
    if(check.size == 0)
    {
        usernames = []
    }
    else{
        usernames =   Object.values(check.val());
    }
    console.log(usernames)
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
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const database = getDatabase(firebase_app);
        const usernames_ref = ref(database,"users/usernames");
        let new_user = {[user.uid]:username};
        set(usernames_ref,new_user)
        sendEmailVerification(user);


        
        // ...
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        if (errorCode == "auth/email-already-in-use"){
            alert("Email already taken ,please use another email !")
        }
        // ..
      });
    
}


async function SignIn(evt){
    evt.preventDefault();
    const email = sign_in.elements["sign-in-email"].value;
    const password = sign_in.elements["sign-in-password"].value;

    if (isEmpty(email) || isEmpty(password)){
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

    //sign in firebase
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      
      const user = userCredential.user;
      if (user.emailVerified == true){
        const database = getDatabase(firebase_app)
        const usernames_ref = ref(database,"users/usernames");
        console.log(user)
        //const verified_user = {`${user.uid}`:}

        //window.location.href = "./user.html";
      }
      else{
        alert("please verify your email to log in !")

      }
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/user-not-found"){
        alert($`User not found , No user with the email (${email})`)
        return
      }
      if(errorCode == "auth/wrong-password"){
        alert("wrong password , please try again !")
        return
      }
      if(errorCode == "auth/too-many-requests"){
        alert("Too many attempts , please try again later !");
      }

    });
}


async function ResetPassword(evt){
    const email = sign_in.elements["sign-in-email"].value;
    if (isEmpty(email)){
        alert("please write your email in email field and try again")
        return
    }

    if (validateEmail(email) == false){
        alert("Wrong email format ,please enter a valid email");
        return
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth,email)
    .then( (userCredential) => {

        alert("A password reset link was set to you mail ,check your email (and spam list if not found) and reset your password (dont forget to write a valid password)!")
    })
    .catch((error) => {
          alert("Unknown error please try again later !");
      });

}