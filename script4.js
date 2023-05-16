import firebase_app from "./util.js";
import {getDatabase,ref,remove,update} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

let user_search_input = document.getElementById("user-search-input");

let info_btns = null;
let update_btns = null;
let delete_btns = null;


//events

user_search_input.oninput = search_items;


function initVars(){
    info_btns = document.querySelectorAll("#item-info-btn");
    update_btns = document.querySelectorAll("#item-update-btn");
    delete_btns = document.querySelectorAll("#item-delete-btn");
    info_btns.forEach(button =>{
        button.addEventListener("click",getInfo);
    })
    update_btns.forEach(button =>{
        button.addEventListener("click",updateItem);
    })
    delete_btns.forEach(button =>{
        button.addEventListener("click",deleteItem);
    })
    return
}


function search_items(e){
    let all_items = document.getElementById("results-area");
    let input = String(e.srcElement.value);
    let items = Array.from(all_items.children);
    items.forEach(element => {
        if(String(element.children[1].childNodes[1].innerText).trim().toLowerCase().startsWith(input.trim().toLowerCase())){
            element.style.removeProperty("display");
        }
        else{
            element.style.display = "none"
        }
        
    });

}

function getInfo(e){
    //get item id 
    const chosen_item = e.target.offsetParent.parentElement;
    let item_id = chosen_item.getAttribute("item_id")
    localStorage.setItem("selected_item_to_preview",item_id)
    window.location.href = "details.html"
}

function updateItem(evt){
    let chosen_item = evt.target.offsetParent.parentElement;
    let item_id= chosen_item.getAttribute("item_id")
    //update in firebase
    localStorage.setItem("selected_item_to_update",item_id)
    window.location.href = "update.html"
}


function deleteItem(evt){
    let chosen_item = evt.target.offsetParent.parentElement;
    let item_id= chosen_item.getAttribute("item_id")
    //delete from firebase
    const database = getDatabase(firebase_app);
    const item_ref = ref(database,"items/"+item_id);
    remove(item_ref)
    alert("Item Removed Successfully")
}


initVars()

export {initVars}