// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

async function fetchKey() {
    const response = await fetch(/api/home/key.js);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      return json;
    
}

const myKey = await fetchKey();


const firebaseConfig = {
  apiKey: myKey.myKey,
  authDomain: "aisturdyhelp.firebaseapp.com",
  projectId: "aisturdyhelp",
  storageBucket: "aisturdyhelp.appspot.com",
  messagingSenderId: "309870602306",
  appId: "1:309870602306:web:2273af72ef06e750c0a5db",
  measurementId: "G-L12NERV1JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

