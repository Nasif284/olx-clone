
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth"; 
import {getStorage} from 'firebase/storage'
import { collection, getDocs, getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyABBkjT48dH8zfhFJFwvBhPIT3Fhf8-7z4",
  authDomain: "olx-project-d2efb.firebaseapp.com",
  projectId: "olx-project-d2efb",
  storageBucket: "olx-project-d2efb.firebasestorage.app",
  messagingSenderId: "1062998717437",
  appId: "1:1062998717437:web:9383c20190f58ccad1df94"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);



  export {
    auth,
    provider,
    storage,
    fireStore,
  }

