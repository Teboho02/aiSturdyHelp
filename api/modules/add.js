// Import the Firebase functions using CommonJS
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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
    const db = getFirestore(app);



    // Example usage of Firestore
    async function addData() {
        try {
            await setDoc(doc(db, 'modules', 'Name'), {
                name: 'New City',
            });
            console.log('Document written successfully!');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    // Call the function
    await addData();
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { str } = req.body;

            if (!str) {
                return res.status(400).json({ error: 'No prompt provided' + req.body });
            }

            const name = str.name;
            const mark = str.mark;

          
            res.status(200).json({ response: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}


// Call the initialization function
initializeFirebase().catch(error => {
    console.error('Error initializing Firebase: ', error);
});


