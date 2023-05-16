import {validatePassword,validateUserName} from "./validation.js"
import firebase_app from "./util.js";
import {getDatabase , ref , onValue , get,push , set , update , remove , child} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const sign_up_link = document.querySelector("#sign-up > form > div.form-actions > p > a");
const sign_in_link = document.querySelector("#sign-in > form > div.form-actions > p:nth-child(3) > a");
const sign_up_username = document.getElementById("sign-up-username");
const sign_up_password = document.getElementById("sign-up-password");
const sign_in_password = document.getElementById("sign-in-password");
const confirm_password = document.getElementById("confirm-password");
let valid_form = false;
sign_in_link.x = "sign_up";
sign_up_link.x = "sign_in";
sign_in_password.x = "sign_in";
sign_up_password.x = "sign_up";
sign_in_link.addEventListener("click",Enableform);
sign_up_link.addEventListener("click",Enableform);
sign_up_username.oninput = checkUsername;
sign_up_password.oninput = checkPassword;
sign_in_password.oninput = checkPassword;
confirm_password.oninput = checkConfirmPassword;


function Enableform(evt){
    let target = evt.target.x;
    if (target == "sign_in"){
        document.getElementById("sign-up").style.visibility = "hidden";
        document.getElementById("sign-in").style.visibility = "visible";
        
    }
    else{
        document.getElementById("sign-in").style.visibility = "hidden";
        document.getElementById("sign-up").style.visibility = "visible";
    }
}


async function checkUsername(evt){
    const database = getDatabase(firebase_app)
    const usernames_ref = ref(database,"users/usernames");
    const check = await get(usernames_ref)
    const usernames = Object.values(check.val())
    if (validateUserName(sign_up_username.value) && !usernames.includes(sign_up_username.value))
    {
        sign_up_username.style.border = "solid 3px var(--secondary-color-1)";
    }
    else{
        sign_up_username.style.border = "solid 3px red";
    }
}

function checkPassword(evt){
    let target = evt.target.x; 
    if (target == "sign_up"){
        let check = validatePassword(sign_up_password.value);
        if (check == false){
            sign_up_password.style.border = "solid 3px red";
        }
        else{
            sign_up_password.style.border = "solid 3px var(--secondary-color-1)";
        }
    }
    else{
        let check = validatePassword(sign_in_password.value);
        if (check == false){
            sign_in_password.style.border = "solid 3px red";
        }
        else{
            sign_in_password.style.border = "solid 3px var(--secondary-color-1)";
        }   
    }
}

function checkConfirmPassword(){
    let valid = sign_up_password.value == confirm_password.value;
    if(valid == false){
        confirm_password.style.border = "solid 3px red";

    }
    else{
        confirm_password.style.border = "solid 3px var(--secondary-color-1)";
    }
}

