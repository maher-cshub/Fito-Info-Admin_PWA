import firebase_app from "./util.js";
import {getDatabase,ref,get} from  "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

let item_image = document.querySelector("#item-image");
let current_page = document.getElementsByTagName("html");

function updateDOM(){
  var coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        // content.scrollHeight + "px"
        content.style.maxHeight = "70vh";
      } 
      content.classList.toggle("active-content");
    });
  }
  
}

function setContent(items){
  let infos = Object.entries(items)
  const contentarea = document.getElementById("content-area");
  infos.forEach(info => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    div1.setAttribute("class","collapsible");
    div2.setAttribute("class","content");
    div1.innerHTML = `${info[0]}`
    div2.innerHTML = `<iframe srcdoc='${info[1]}' frameborder="0"></iframe>`
    contentarea.appendChild(div1);
    contentarea.appendChild(div2);
    console.log(info)
  });
}

function LoadPage(){
  current_page[0].style.opacity = 0;
  const database = getDatabase(firebase_app);
  let target_id = localStorage.getItem("selected_item_to_preview");
  const target_ref = ref(database,`items/${target_id}`);
  get(target_ref)
  .then((snapshot)=>{
    let item = snapshot.val()
    item_image.querySelector("img").setAttribute("src",item["image"])
    item_image.querySelector("span").innerText = item["name"];
    setContent(item["infos"])
    updateDOM()
    current_page[0].style.opacity = 1;
    
  })

  .catch((error) => {
  })
  
  
}

document.addEventListener("DOMContentLoaded", e =>{
  LoadPage()
})
