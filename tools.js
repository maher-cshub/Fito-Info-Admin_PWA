const loader = document.querySelector(".loader-active");

window.onload = ShowContent;
//document.addEventListener("DOMContentLoaded",ShowContent)

function ShowContent(){
    
    loader.classList.add("loader-hidden")
    loader.addEventListener("transistioned",()=>{
        loader.remove()
    })
}

document.querySelector("#year").innerHTML = `${new Date().getFullYear()}`