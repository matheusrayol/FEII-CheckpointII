// Verifica se o usuário já está conectado. 
onload = function () {
// Se o token de usuário estiver presente no Local Storage ou no Session Storage
    if (tokenAtual()) {
        // Redireciona o usuário para a área logada
        window.location.href = "tarefas.html"
    } 
    // Se o token de usuário não estiver presente no Local Storage ou no Session Storage
    else {
        // Exibe a informação no console e habilita a área de login
        console.log("Usuário desconectado. Exibindo página de login.")
        areaLogin.removeAttribute('hidden');
    }
}

// Inicializa as variáveis que receberão os valores dos campos de e-mail e senha normalizados
let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;

// Pré-configura as variáveis de validação de e-mail e senha para impedir ação do botão de login
let emailEValido = false;
let senhaEValida = false;

// Criação do objeto que receberá as informações de login (e-mail e senha) que o usuário preencher
const usuarioObjeto = {
    email: '',
    password: ''
}

// Event Listener - Campo de E-mail
campoEmail.addEventListener('input', () => {

    // Verifica se o campo de e-mail está com um e-mail em formato válido. Caso esteja, altera a borda do elemento para verde e remove qualquer mensagem de erro existente.
    if (validarCampo(campoEmail)) {
        campoEmail.style.border = "3px solid #5369f8";
        limpaMensagem(campoEmailMensagem);
        emailEValido = true;
    }
    else if (campoEmail.value == "") {
        campoEmail.style.border = "3px solid #ced4da"
        limpaMensagem(campoEmailMensagem);
        emailEValido = false;
    }
    // Caso ainda não esteja com o formato válido, altera a borda do elemento para vermelho e a mensagem de erro é exibida assim que o texto começar a ser introduzido no campo.    
    else {
        campoEmail.style.border = "3px solid red";
        constroiMensagem("erro", "Formato de E-mail inválido.", campoEmailMensagem);
        emailEValido = false;
    }
});

// Event Listener - Campo de Senha
campoSenha.addEventListener('input', () => {

    // Verifica se o campo de senha não está vazio, e que ele possui o mínimo de 8 caracteres. Caso possua, remove qualquer mensagem de erro e altera a borda do elemento para verde.
    if (validarCampo(campoSenha)) {
        campoSenha.style.border = "3px solid #5369f8";
        limpaMensagem(campoSenhaMensagem);
        senhaEValida = true;
    }
    else if (campoSenha.value == "") {
        campoSenha.style.border = "3px solid #ced4da";
        limpaMensagem(campoSenhaMensagem);
        senhaEvalida = false;
    } 
    // Caso o campo de senha ainda não tenha o mínimo de 8 caracteres, a mensagem de erro é exibida assim que o texto começar a ser introduzido no campo.
    else {
        campoSenha.style.border = "3px solid red";
        constroiMensagem("erro", "A senha deve possuir no mínimo 8 caracteres.", campoSenhaMensagem);
        senhaEValida = false;
    }
});

// Event Listener - Botão de Login
botaoLogin.addEventListener('click', evento => {

    // Verifica se o usuário preencheu os campos de e-mail e senha. 
    // Caso não tenha preenchido, impede o envio do formulário e exibe mensagem de erro.
    if (validarLogin()) {
        limpaMensagem(statusLoginMensagem);
        evento.preventDefault();

        // Exibe o spinner durante o processo de login
        mostrarSpinner();

        // Chama a função que constroi a requisição para o login
        efetuaRequisicao('login');

    } else {
        evento.preventDefault();
        // Interrompe o spinner
        constroiMensagem("erro", "Preencha todos os campos corretamente.", statusLoginMensagem);
    }
});

// Validação do login
function validarLogin() {
    if (emailEValido && senhaEValida) {
        return true
    } else {
        return false
    }
}