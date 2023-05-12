import firebase_app from "../util.js"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {getDatabase , ref , push , set , update , remove , child} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

/*
const database = getDatabase(firebase_app);
console.log(firebase_app)
console.log(getAuth(firebase_app))
console.log(database)*/