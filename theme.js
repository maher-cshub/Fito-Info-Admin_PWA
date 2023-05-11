let theme = document.getElementById("theme-icon");
theme.addEventListener("click",change_theme);

function change_theme(e){
    const current_theme = document.getElementById("app-ui");
    if (current_theme.className == "light-theme")
    {
        localStorage.setItem("theme","dark-theme");
        current_theme.classList.replace("light-theme","dark-theme");
        theme.src = "/assets/sun.svg";
        
    }
    else{
        localStorage.setItem("theme","light-theme");
        current_theme.classList.replace("dark-theme","light-theme");
        theme.src = "/assets/moon.svg";
        
    }
}

document.addEventListener("DOMContentLoaded", e =>{
    const current_theme = document.getElementById("app-ui");
    const actual_theme = localStorage.getItem("theme")
    if(current_theme.classList.length == 0){
        current_theme.classList.toggle(actual_theme)
    }
    else{
        current_theme.classList.remove(current_theme.classList.item(0));
        current_theme.classList.toggle(actual_theme);
    }
    if (actual_theme == "dark-theme"){
        theme.src = "/assets/sun.svg";
    }
    else{
        theme.src = "assets/moon.svg";
    }
})
