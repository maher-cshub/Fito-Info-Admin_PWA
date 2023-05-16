function validatePassword(password){
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password)

}

function validateEmail(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}


function validateUserName(username){
    let check = username.length > 2 && username.length < 16;
    return check;
}


export {validatePassword,validateEmail,validateUserName}