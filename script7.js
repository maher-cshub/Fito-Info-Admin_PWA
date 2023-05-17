import {getDatabase,ref,get,update} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import firebase_app from "./util.js";

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
const chapter_name_field = document.getElementById("chapter-name");
chapter_name_field.oninput = setChapter
update_btn.addEventListener("click",Update);


function validateInputs(item){
    if (item["item_image"].length <=0){
        return false;
    }
    else{
        if ((item["chapter_name"].length > 0 && item["chapter_content"].length <=0) || (item["chapter_name"].length <= 0 && item["chapter_content"].length >0)){
            return false
        }
        else
        {
            return true   
        }

    }
}

function LoadPage(){
    //current_page[0].style.opacity = 0;
    const database = getDatabase(firebase_app);
    let target_id = localStorage.getItem("selected_item_to_update");
    const target_ref = ref(database,`items/${target_id}`);
    get(target_ref)
    .then((snapshot)=>{
      let item = snapshot.val()
      document.getElementById("item-title").value = item["name"];
      document.getElementById("item-image").value = item["image"];
      if(item["infos"] != null || item["infos"] != undefined){
        localStorage.setItem("infos",JSON.stringify(item["infos"]));
      }
      
      //current_page[0].style.opacity = 1;
      
    })
  
    .catch((error) => {
    })
}
    

function setChapter(evt){
    let infos = null
    let test = localStorage.getItem("infos")
    if (test === "null" || test === "undefined"){
        
        return
    }
    else{
        infos = JSON.parse(test)
        chapter_name_field.value = chapter_name_field.value.toUpperCase();
        let input = evt.srcElement.value;
        
        if (Object.keys(infos).includes(input)){
            tinymce.get("default").setContent(infos[input]);
        }
        else
        {
            tinymce.get("default").setContent("");
        }
    }

}




function Update(){
    //const item_name = document.getElementById("item-title").value;
    const item_data = {
        item_image: document.getElementById("item-image").value,
        chapter_name: document.getElementById("chapter-name").value,
        chapter_content: tinymce.get("default").getContent()
    }
    let target_id = localStorage.getItem("selected_item_to_update");
    const database = getDatabase(firebase_app);
    const item_ref = ref(database,`items/${target_id}`);
    if (validateInputs(item_data)){
        
        //save to fb
        const date_update =  new Date().toLocaleDateString();
        const time_update =  new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});
        const user_uid = localStorage.getItem("currentUser");
        let infos = {}
        let test = localStorage.getItem("infos")
        if (test !== "null" && test !== "undefined"){
            infos = Object.assign({},JSON.parse(localStorage.getItem("infos")));
        }
        if (item_data["chapter_name"].length > 0){
            infos[item_data["chapter_name"]]=item_data["chapter_content"];
        }
        const last_updated = {user_uid:user_uid,time:time_update,date:date_update}
        const item = {image:item_data["item_image"],last_updated:last_updated};
        if (infos != {}){
            item["infos"] = infos
        }
        update(item_ref,item)
        .then((snapshot) =>{
            alert("Item Updated Successfully");
            window.location.href = "user.html"
            return
        })
        .catch((error)=>{

        })
    }
    else{
        alert("please fill all fields !!!");
        return
    }
    

}



document.addEventListener("DOMContentLoaded", e =>{
    localStorage.removeItem("infos")
    LoadPage()
    
  })
  