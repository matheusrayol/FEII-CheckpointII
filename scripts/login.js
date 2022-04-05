let campoEmailLogin = document.getElementById(`inputEmail`);
let campoSenhaLogin = document.getElementById(`inputPassword`);
let botaoLogin = document.getElementById(`buttonSubmit`);

let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;

let emailEValido = false;
let senhaEValida = false;

botaoLogin.setAttribute('disabled', 'true');
botaoLogin.innerText = "Bloqueado";

const usuarioObjeto = {
    email: '',
    senha: ''
}

botaoLogin.addEventListener('click', function(evento) {

    if (validaTelaDeLogin()) {
        console.log("Informações OK");

        // Normalizações - Retirada de espaços em branco
        campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(campoEmailLogin.value);
        campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(campoSenhaLogin.value);

        // Normalizações - Converte o e-mail em minúsculas
        campoEmailLoginNormalizado = converteValorRecebidoEmMinusculo(campoEmailLoginNormalizado);

        console.log(campoEmailLoginNormalizado);
        console.log(campoSenhaLoginNormalizado);

        usuarioObjeto.email = campoEmailLoginNormalizado;
        usuarioObjeto.senha = campoSenhaLoginNormalizado;

    } else {
        evento.preventDefault();
        alert("Preencha o e-mail e senha para fazer o login!")
    }

})

campoEmailLogin.addEventListener('blur', function() {

    let inputEmailValidacao = document.getElementById('inputEmailValidacao');

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(campoEmailLogin.value)) {
        inputEmailValidacao.innerText = "";
        campoEmailLogin.style.border = "1px solid green";
        emailEValido = true;
    } else {
        inputEmailValidacao.innerText = "Formato de e-mail inválido";
        inputEmailValidacao.style.color = "red";
        inputEmailValidacao.style.fontSize = "8";
        inputEmailValidacao.style.fontWeight = "bold";
        campoEmailLogin.style.border = "1px solid red";
        emailEValido = false;
    }

    validaTelaDeLogin();
})

campoSenhaLogin.addEventListener('blur', function() {

    let inputSenhaValidacao = document.getElementById('inputSenhaValidacao');

    if (campoSenhaLogin.value != "" && campoSenhaLogin.value.length >= 8) {
        inputSenhaValidacao.innerText = "";
        campoSenhaLogin.style.border = "1px solid green";
        senhaEValida = true;
    } else {
        inputSenhaValidacao.innerText = "A senha deve ter no mínimo 8 caracteres";
        inputSenhaValidacao.style.color = "red";
        inputSenhaValidacao.style.fontSize = "8";
        inputSenhaValidacao.style.fontWeight = "bold";
        campoSenhaLogin.style.border = "1px solid red";
        senhaEValida = false;
    }

    validaTelaDeLogin();
})

function validaTelaDeLogin() {
    if (emailEValido && senhaEValida) {
        botaoLogin.removeAttribute('disabled');
        botaoLogin.innerText = "Entrar";
        return true;
    } else if ((emailEValido && !senhaEValida) || (!emailEValido && senhaEValida)) {
        return false;
    } else {
        botaoLogin.setAttribute('disabled', 'true');
        return false;
    }
}