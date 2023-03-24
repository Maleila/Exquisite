// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6-SdGoyVblqTUasbdO-IXD-zjjcPpLWM",
  authDomain: "exquisite-corpse-b86ba.firebaseapp.com",
  projectId: "exquisite-corpse-b86ba",
  storageBucket: "exquisite-corpse-b86ba.appspot.com",
  messagingSenderId: "258724176407",
  appId: "1:258724176407:web:8422a485d31fc402087252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}