document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout_button");

    logoutButton.addEventListener("click", function() {
        console.log("Logout button clicked");
 
        window.location.href = "Inicio_Sesion.html";
    });
});
