function handleCredentialResponse(response) {
    // This is where you would handle the Google Sign-In response
    console.log("Encoded JWT ID token: " + response.credential);
    // You can send this token to your server for further authentication/authorization
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
