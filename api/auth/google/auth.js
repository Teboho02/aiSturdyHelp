const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

// Function to verify the ID token
async function verifyToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: '309870602306-546sbid5cq1trf3o2q1vddds9ecua4s2.apps.googleusercontent.com',  // This should match your OAuth 2.0 Client ID
    });
    const payload = ticket.getPayload();  // Extract the user's profile information
    return payload;
}

// API handler function
export default async function handler(req, res) {
    const { id_token } = req.body;  // Extract the ID token from the request body

    try {
        const payload = await verifyToken(id_token);  // Verify the token

        // Here, you would typically check if the user exists in your database
        // For example:
        // let user = await findUserById(payload.sub);
        // if (!user) {
        //     user = await createUser(payload);
        // }

        // Respond with success and the user profile info
        res.json({ success: true, user: payload });
    } catch (error) {
        // Handle token verification errors
        res.json({ success: false, message: 'Failed to verify token', error });
    }
}
