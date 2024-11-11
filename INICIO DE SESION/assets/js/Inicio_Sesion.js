document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");


    function mostrarFormularioLogin() {
        console.log("mostrarFormularioLogin function called");

        if (window.innerWidth > 850) {
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        } else {
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function mostrarFormularioRegister() {
        console.log("mostrarFormularioRegister function called");

        if (window.innerWidth > 850) {
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        } else {
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
    }

    async function iniciarSesion() {
        console.log("iniciarSesion function called");

        const email = document.getElementById("email_login").value;
        const password = document.getElementById("password_login").value;

        console.log("Sending login data:", email, password);

        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(response => {
            if (response.ok) {
                alert("Bienvenido");
                window.location.href = "Inicio.html";
            } else {
                alert("Usuario inválido");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error en el inicio de sesión");
        });
    }

    async function registrarse() {
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email_registro").value;
        const password = document.getElementById("password_registro").value;
        const role = document.getElementById("rol_registro").value;
    
        fetch("http://localhost:8080/usuarios/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                password: password,
                role: role,
            }),
        })
        .then(response => {
            if (response.ok) {
                alert("Registro exitoso");
                mostrarFormularioLogin();
            } else {
                alert("Error en el registro");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error en el registro");
        });
    }
    
    async function iniciarSesion() {
        const email = document.getElementById("email_login").value;
        const password = document.getElementById("password_login").value;
    
        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.role) {
                if (data.role === "ADMIN") {
                    window.location.href = "Inicio_Admin.html";
                } else {
                    window.location.href = "Inicio.html";
                }
            } else {
                alert("Usuario inválido");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error en el inicio de sesión");
        });
    }
    


    document.getElementById("btn__iniciar-sesion").addEventListener("click", mostrarFormularioLogin);
    document.getElementById("btn__registrarse").addEventListener("click", mostrarFormularioRegister);


    document.getElementById("login_button").addEventListener("click", iniciarSesion);
    document.getElementById("register_button").addEventListener("click", registrarse);
    
    window.addEventListener("resize", anchoPage);

  
    var formulario_login = document.querySelector(".formulario__login");
    var formulario_register = document.querySelector(".formulario__register");
    var contenedor_login_register = document.querySelector(".contenedor__login-register");
    var caja_trasera_login = document.querySelector(".caja__trasera-login");
    var caja_trasera_register = document.querySelector(".caja__trasera-register");

    console.log("Variables declared");

  
    function anchoPage() {
        console.log("anchoPage function called");

        if (window.innerWidth > 850) {
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "block";
        } else {
            caja_trasera_register.style.display = "block";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.display = "none";
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
        }
    }

    anchoPage();
});
