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
        limpaMensagemDeErro(campoEmailMensagem);
        emailEValido = true;
    }
    else if (campoEmail.value == "") {
        campoEmail.style.border = "3px solid #ced4da"
        limpaMensagemDeErro(campoEmailMensagem);
        emailEValido = false;
    }
    // Caso ainda não esteja com o formato válido, altera a borda do elemento para vermelho e a mensagem de erro é exibida assim que o texto começar a ser introduzido no campo.    
    else {
        campoEmail.style.border = "3px solid red";
        constroiMensagemDeErro("Formato de E-mail inválido.", campoEmailMensagem);
        emailEValido = false;
    }
});

// Event Listener - Campo de Senha
campoSenha.addEventListener('input', () => {

    // Verifica se o campo de senha não está vazio, e que ele possui o mínimo de 8 caracteres. Caso possua, remove qualquer mensagem de erro e altera a borda do elemento para verde.
    if (validarCampo(campoSenha)) {
        campoSenha.style.border = "3px solid #5369f8";
        limpaMensagemDeErro(campoSenhaMensagem);
        senhaEValida = true;
    }
    else if (campoSenha.value == "") {
        campoSenha.style.border = "3px solid #ced4da";
        limpaMensagemDeErro(campoSenhaMensagem);
        senhaEvalida = false;
    } 
    // Caso o campo de senha ainda não tenha o mínimo de 8 caracteres, a mensagem de erro é exibida assim que o texto começar a ser introduzido no campo.
    else {
        campoSenha.style.border = "3px solid red";
        constroiMensagemDeErro("A senha deve possuir no mínimo 8 caracteres.", campoSenhaMensagem);
        senhaEValida = false;
    }
});

// Event Listener - Botão de Login
botaoLogin.addEventListener('click', evento => {

    // Verifica se o usuário preencheu os campos de e-mail e senha. 
    // Caso não tenha preenchido, impede o envio do formulário e exibe mensagem de erro.
    if (validarLogin()) {
        limpaMensagemDeErro(statusLoginMensagem);
        console.log("Todos os campos para login foram preenchidos.");
        evento.preventDefault();

        // Normaliza os campos retirando espaços em branco
        campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(campoEmail.value);
        campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(campoSenha.value);

        // Normaliza os caracteres do e-mail para minúsculas
        campoEmailLoginNormalizado = converteValorRecebidoEmMinusculo(campoEmailLoginNormalizado);

        // Exibe os dados informados durante o login
        console.log(`E-mail informado: ${campoEmailLoginNormalizado}`);
        console.log(`Senha informada: ${campoSenhaLoginNormalizado}`);

        // Adiciona o e-mail e senha ao objeto da página
        usuarioObjeto.email = campoEmailLoginNormalizado;
        usuarioObjeto.password = campoSenhaLoginNormalizado;

        // Converte o objeto em string JSON
        const usuarioObjetoEmString = JSON.stringify(usuarioObjeto);

        // Prepara o envio do objeto JSON para a API de login
        // REFATORAÇÃO: Ficaria melhor se criássemos uma função para a geração das calls de API de acordo com o tipo de requisição presente na documentação (GET, POST, PUT, DELETE)
        const loginUrlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/users/login";
        const configuracaoDaRequisicao = {
            method: 'POST',
            body: usuarioObjetoEmString,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Envia a requisição para a API de login
        fetch(loginUrlEndpoint, configuracaoDaRequisicao).then(
            // Recebe a resposta da API de login
            resultado => {
                // Verifica o status da resposta
                // Se o status for 201, o login foi validado com sucesso
                if (resultado.status == 201) {
                    return resultado.json();
                }
                throw resultado;
            }
        )
            .then(
                // Recebe o objeto JSON da API de login
                resultado => {
                    // Chama a função sucessoNoLogin para continuar a requisição e armazenar o token no localStorage.
                    sucessoNoLogin(resultado.jwt);
                }
            )
            .catch(
                erro => {
                    // Caso o login não tenha sido bem-sucedido, informa a mensagem no console
                    // e exibe a mensagem de erro abaixo do formulário de login.
                    erroNoLogin(erro.status);
                }
            )
    } else {
        evento.preventDefault();
        constroiMensagemDeErro("Preencha todos os campos corretamente.", statusLoginMensagem);
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

// Função de retorno em caso de sucesso no login
function sucessoNoLogin(tokenRecebido) {
    // Exibe no console a resposta recebida da API de login
    console.log(`JSON Recebido: ${tokenRecebido}`);
    // Altera a mensagem de erro para informar que o login foi bem-sucedido
    constroiMensagemInformativa("Redirecionando...", statusLoginMensagem);

    // Verifica se o usuário selecionou a opção de manter login
    if (checkboxManterLogin.checked) {
        // Armazena o token no localStorage
        localStorage.setItem("jwt", tokenRecebido);
    } else {
        // Armazena o token no sessionStorage
        sessionStorage.setItem("jwt", tokenRecebido);
    }
    
    // Rediciona para a página de tarefas
    location.href = "tarefas.html";
}

// Função de retorno em caso de erro no login
function erroNoLogin(statusRecebido) {
    // Limpa o campo da senha
    campoSenha.value = "";
    campoSenha.style.border = "3px solid #ced4da";

    // Exibe no console o status da resposta da API de login
    console.log(`Status recebido: ${statusRecebido}`);

    // Altera a mensagem de erro para informar que o login não foi bem-sucedido
    if (statusRecebido == 400 || statusRecebido == 404) {
        console.log("Falha no login. Verifique o e-mail e senha informados.");
        constroiMensagemDeErro("Falha no login. Verifique o e-mail e senha informados.", statusLoginMensagem);
    } else if (statusRecebido == 500) {
        console.log("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        constroiMensagemDeErro("Ocorreu um erro no servidor. Tente novamente mais tarde.", statusLoginMensagem);
    } else {
        limpaMensagemDeErro(statusLoginMensagem)
    }
    validarLogin();
}