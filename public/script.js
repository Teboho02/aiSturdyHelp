function handleCredentialResponse(response) {
    const idToken = response.credential;
    console.log("Encoded JWT ID token: " + idToken);

    // Sending the token to the server for verification
    fetch('/api/auth/google/auth.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: idToken })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from your server
        if (data.success) {
            // Redirect the user or update the UI
            window.location.href = "home.html";
        } else {
            console.error('Failed to authenticate with the server:', data.message);
        }
    })
    .catch(error => console.error('Error sending token to server:', error));
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "309870602306-546sbid5cq1trf3o2q1vddds9ecua4s2.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        { theme: "outline", size: "large" }  // customization attributes
    );

    google.accounts.id.prompt();  // Also display the One Tap dialog
};
