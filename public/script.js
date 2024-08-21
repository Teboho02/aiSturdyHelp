function handleCredentialResponse(response) {
    // This is where you would handle the Google Sign-In response
    console.log("Encoded JWT ID token: " + response.credential);
    // You can send this token to your server for further authentication/authorization
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        { theme: "outline", size: "large" }  // customization attributes
    );

    google.accounts.id.prompt();  // Also display the One Tap dialog
};
