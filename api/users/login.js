// Import the Firebase functions using CommonJS
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const { getAnalytics } = require('firebase/analytics');

// Your Firebase configuration will be set after fetching the key

async function fetchKey() {
    const response = await fetch('https://ai-sturdy-help.vercel.app/api/home/key.js');

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

async function initializeFirebase() {
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
    const db = getFirestore(app);

    // Example usage of Firestore
    async function addData() {
        try {
            await setDoc(doc(db, 'cities', 'new-city-id'), {
                name: 'New City',
                state: 'CA',
                country: 'USA'
            });
            console.log('Document written successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    // Call the function
    await addData();
}

// Call the initialization function
initializeFirebase().catch(error => {
    console.error('Error initializing Firebase: ', error);
});
