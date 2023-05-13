function CheckUser(){
    const uid = localStorage.getItem("currentUser");
    console.log(uid)
    if (uid == null || uid == undefined ){
        window.location.href = "index.html"
    }
}

CheckUser()