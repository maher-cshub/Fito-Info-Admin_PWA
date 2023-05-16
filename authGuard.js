
function CheckUser(){
    const uid = sessionStorage.getItem("currentUser");
    if (uid == null || uid == undefined ){
        window.location.href = "index.html"
    }
}

CheckUser()

