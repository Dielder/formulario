const form = document.getElementById("form");
const username = document.getElementById("username");;
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value;
    const passwordValue = password.value;

    if (usernameValue === "") {
        setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if (passwordValue === "") {
        setErrorFor(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 7) {
        setErrorFor(password, "Senha incorreta.");
    } else {
        setSuccessFor(password);
    }

    // Recuperar dados do localStorage
    let listaUser = JSON.parse(localStorage.getItem("listaUser")) || [];

    // Verificar credenciais
    let userEncontrado = listaUser.find(user => user.nome === usernameValue && user.senha === passwordValue);

    if (userEncontrado) {
        console.log("Credenciais válidas! O usuário está autenticado.");
        window.location.href = "../html/index.html";
    } else if (username !== usernameValue) {
        setErrorFor(username, "Usuário inválido.");
    }
    else if (password !== passwordValue) {
        setErrorFor(password, "Senha inválida.");
    }



    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");

        // Adiciona a mensagem de erro
        small.innerText = message;

        // Adiciona a classe de erro
        formControl.className = "form-control error";
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;

        // Adicionar a classe de sucesso
        formControl.className = "form-control success";
    }
}