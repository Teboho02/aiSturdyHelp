const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const myKey = process.env.apiKey;


const firebaseConfig = {
    apiKey: myKey,
    authDomain: "aisturdyhelp.firebaseapp.com",
    projectId: "aisturdyhelp",
    storageBucket: "aisturdyhelp.appspot.com",
    messagingSenderId: "309870602306",
    appId: "1:309870602306:web:2273af72ef06e750c0a5db",
    measurementId: "G-L12NERV1JR"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  


export default async function handler(req, res) {



// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});


}