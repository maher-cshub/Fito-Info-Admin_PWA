var coll = document.getElementsByClassName("collapsible");
let item_image = document.querySelector("#item-image");
let current_page = document.getElementsByTagName("html");

for (i = 0; i < coll.length; i++) {
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



  document.addEventListener("DOMContentLoaded", e =>{
    //current_page[0].style.visibility = "hidden";
    target_object = JSON.parse(localStorage.getItem("selected_item"));
    item_image.querySelector("img").setAttribute("src",target_object["item_image"])
    item_image.querySelector("span").innerText = target_object["item_name"];
   // current_page[0].style.visibility = "visibile";
})
