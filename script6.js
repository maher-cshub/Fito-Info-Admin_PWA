import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {getDatabase,ref,push} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import firebase_app from "./util.js";

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

const get_btn = document.getElementById("save-btn");
get_btn.addEventListener("click",test);

function validateInputs(item){
    if (item.length <= 0 ){
        return false;
    }
    else{
        return true;
    }
}

function test(){
    const item_name = document.getElementById("item-title").value;
    const item_image = document.getElementById("item-image").value;
    const chapter_name = document.getElementById("chapter-name").value;
    const chapter_content = tinymce.get("default").getContent();
    if (validateInputs(item_image) && validateInputs(item_name) && validateInputs(chapter_name) && validateInputs(chapter_content)){
        //save to fb
        const date_update =  new Date().toLocaleDateString();
        const time_update =  new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"});
        const user_uid = localStorage.getItem("currentUser");
        const infos= {[chapter_name]:chapter_content};
        const last_updated = {user_uid:user_uid,time:time_update,date:date_update}
        const item = {name:item_name,image:item_image,infos:infos,last_updated:last_updated};
        const database = getDatabase(firebase_app);
        const item_ref = ref(database,"items");
        push(item_ref,item);
        alert("yayyyy")
        return
    }
    else{
        alert("please fill all fields !!!");
    }

    var text =``
    //myContent.setContent(text)
}