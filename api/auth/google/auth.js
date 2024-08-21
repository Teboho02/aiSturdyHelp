const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

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

// Function to verify the ID token
async function verifyToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: '309870602306-546sbid5cq1trf3o2q1vddds9ecua4s2.apps.googleusercontent.com',  // Replace with your OAuth 2.0 Client ID
    });
    const payload = ticket.getPayload();  // Extract the user's profile information
    return payload;
}

// API handler function
export default async function handler(req, res) {
    const { id_token } = req.body;  // Extract the ID token from the request body

    try {
        const payload = await verifyToken(id_token);  // Verify the token

        const userRef = doc(db, 'users', payload.sub);  // Correct Firestore document reference
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // User does not exist, create a new user
            await setDoc(userRef, {
                uid: payload.sub,
                email: payload.email,
                name: payload.name,
                // Add any other fields you want to store
            });
        }

        // Respond with success and the user profile info
        res.json({ success: true, user: payload });
    } catch (error) {
        // Handle token verification errors
        res.json({ success: false, message: 'Failed to verify token', error });
    }
}
