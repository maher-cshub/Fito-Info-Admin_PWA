import firebase_app from "./util.js";
import {getDatabase,ref,get,remove} from  "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

let item_image = document.querySelector("#item-image");


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
  var delete_btns = document.getElementsByClassName("delete_btn");
  for (let i = 0; i < delete_btns.length; i++) {
    delete_btns[i].addEventListener("click", function(e){
      let target_id = localStorage.getItem("selected_item_to_preview");
      e.preventDefault();
      var item_id = this.getAttribute("id")
      let database = getDatabase(firebase_app);
      let item_ref = ref(database,`items/${target_id}/infos/${item_id}`)
      remove(item_ref)
      e.target.parentNode.remove()
      alert(`${item_id} Removed Successfully`);

  })
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
    div1.innerHTML = `<span>${info[0]}</span><button class="delete_btn" id="${info[0]}">DELETE</button>`
    div2.innerHTML = `<iframe srcdoc='${info[1]}' frameborder="0"></iframe>`
    contentarea.appendChild(div1);
    contentarea.appendChild(div2);
  });
}

function LoadPage(){
  //current_page[0].style.opacity = 0;
  const database = getDatabase(firebase_app);
  let target_id = localStorage.getItem("selected_item_to_preview");
  const target_ref = ref(database,`items/${target_id}`);
  get(target_ref)
  .then((snapshot)=>{
    let item = snapshot.val()
    item_image.querySelector("img").setAttribute("src",item["image"])
    item_image.querySelector("img").setAttribute("onerror","this.src='/blank.jpg'")
    item_image.querySelector("span").innerText = item["name"];
    if (item["infos"] != null || item["infos"] != undefined)
    {
      setContent(item["infos"])
    }
    updateDOM()
    


    //current_page[0].style.opacity = 1;
    
  })
   


  .catch((error) => {
  })
  
  
}


document.addEventListener("DOMContentLoaded", e =>{
  LoadPage()
  const loader = document.querySelector(".loader-active");
  loader.classList.add("loader-hidden")
  loader.addEventListener("transistioned",()=>{
    loader.remove()
  })
})
