const sign_up_link = document.querySelector("#sign-up > form > div.form-actions > p > a");
const sign_in_link = document.querySelector("#sign-in > form > div.form-actions > p:nth-child(3) > a");

sign_in_link.addEventListener("click",Enableform);
sign_up_link.addEventListener("click",Enableform);
sign_in_link.x = "sign_up";
sign_up_link.x = "sign_in";
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