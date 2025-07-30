import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDUdu6qBfKmPBeeg5tuq6EuJl0wf2SCxY",
    authDomain: "pryfinalreactutn.firebaseapp.com",
    databaseURL: "https://pryfinalreactutn-default-rtdb.firebaseio.com",
    projectId: "pryfinalreactutn",
    storageBucket: "pryfinalreactutn.firebasestorage.app",
    messagingSenderId: "908998541188",
    appId: "1:908998541188:web:733e42676afca14ab567d1",
    measurementId: "G-Z3ZEJ7595Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };