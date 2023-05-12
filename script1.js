const sign_up_link = document.querySelector("#sign-up > form > div.form-actions > p > a");
const sign_in_link = document.querySelector("#sign-in > form > div.form-actions > p:nth-child(3) > a");
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
sign_up_password.oninput = checkPassword;
sign_in_password.oninput = checkPassword;
confirm_password.oninput = checkConfirmPassword;
function Enableform(evt){
    let target = evt.target.x;
    console.log(target)
    if (target == "sign_in"){
        document.getElementById("sign-up").style.visibility = "hidden";
        document.getElementById("sign-in").style.visibility = "visible";
        
    }
    else{
        document.getElementById("sign-in").style.visibility = "hidden";
        document.getElementById("sign-up").style.visibility = "visible";
    }
}

function checkPassword(evt){
    let target = evt.target.x; 
    if (target == "sign_up"){

        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let valid = (re.test(sign_up_password.value))
        if (valid == false){
            sign_up_password.style.border = "solid 3px red";
        }
        else{
            sign_up_password.style.border = "solid 3px var(--secondary-color-1)";
        }
    }
    else{
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let valid = (re.test(sign_in_password.value))
        if (valid == false){
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