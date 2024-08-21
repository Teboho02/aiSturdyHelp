const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "aisturdyhelp.firebaseapp.com",
    projectId: "aisturdyhelp",
    storageBucket: "aisturdyhelp.appspot.com",
    messagingSenderId: "309870602306",
    appId: "1:309870602306:web:2273af72ef06e750c0a5db",
    measurementId: "G-L12NERV1JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default async function handler(req, res) {
    try {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error writing document: ", error);
        res.status(500).json({ success: false, message: "Failed to write document", error });
    }
}
