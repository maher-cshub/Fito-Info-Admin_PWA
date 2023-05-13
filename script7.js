import {getDatabase,ref,push,get,set} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import firebase_app from "./util.js";

let current_page = document.getElementsByTagName("html");

let chapter_name = document.getElementById("chapter-name");

chapter_name.oninput = setChapter;


tinymce.init({
    selector: '#default',
    plugins:[
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 
        'table', 'emoticons', 'template', 'codesample'
    ],
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' + 
    'bullist numlist outdent indent | link image | media fullscreen | ' +
    'forecolor backcolor emoticons',
    menubar: 'insert format',
    statusbar: false,
    promotion: false,
});

const update_btn = document.getElementById("update-btn");
update_btn.addEventListener("click",update);

function validateInputs(item){
    if (item.length <= 0 ){
        return false;
    }
    else{
        return true;
    }
}

function LoadPage(){
    current_page[0].style.opacity = 0;
    const database = getDatabase(firebase_app);
    let target_id = localStorage.getItem("selected_item_to_update");
    
    const target_ref = ref(database,`items/${target_id}`);
    get(target_ref)
    .then((snapshot)=>{
      let item = snapshot.val()
      document.getElementById("item-title").value = item["name"];
      document.getElementById("item-image").value = item["image"];
      localStorage.setItem("infos",JSON.stringify(item["infos"]));
      current_page[0].style.opacity = 1;
      
    })
  
    .catch((error) => {
    })
}
    

function setChapter(evt){
    let input = evt.srcElement.value;
    let infos = JSON.parse(localStorage.getItem("infos"))
    if (Object.keys(infos).includes(input)){
        tinymce.get("default").setContent(infos[input]);
    }
    else
    {
        tinymce.get("default").setContent("");
    }
}




function update(){
    return false;
}



document.addEventListener("DOMContentLoaded", e =>{
    LoadPage()
  })
  