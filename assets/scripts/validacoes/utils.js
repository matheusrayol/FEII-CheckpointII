// Captura de campos - Campos comuns entre páginas
const campoEmail = document.getElementById('email-input');
const campoEmailMensagem = document.getElementById('email-input-message');
const campoSenha = document.getElementById('password-input');
const campoSenhaMensagem = document.getElementById('password-input-message');

// Captura de campos - Página de login
const checkboxManterLogin = document.getElementById('manter-login');
const botaoLogin = document.getElementById('submit-button');
const statusLoginMensagem = document.getElementById('login-status-message');
const areaLogin = document.getElementById('login-screen');

// Captura de campos - Página de cadastro
const campoNome = document.getElementById('name-input');
const campoNomeMensagem = document.getElementById('name-input-message');
const campoSobrenome = document.getElementById('surname-input');
const campoSobrenomeMensagem = document.getElementById('surname-input-message');
const campoConfirmaSenha = document.getElementById('password-confirm-input');
const campoConfirmaSenhaMensagem = document.getElementById('password-confirm-input-message');
const botaoCadastro = document.getElementById('submit-button');
const statusCadastroMensagem = document.getElementById('signup-status-message');
const formularioCadastro = document.querySelector('form');

// Captura de campos - Página de tarefas
const areaConectada = document.getElementById('area-logada');
const areaBloqueada = document.getElementById('area-alerta');
const campoUsername = document.getElementById('user-name');
const botaoSair = document.getElementById('encerrar-sessao');
const contarCaracteres = document.getElementById('character-count');
const campoNovaTarefa = document.getElementById('nova-tarefa');
const campoNovaTarefaMensagem = document.getElementById('nova-tarefa-message');
const botaoNovaTarefa = document.getElementById('adicionar-tarefa');
const tarefasPendentes = document.getElementById('tarefas-pendentes');
const tarefasConcluidas = document.getElementById('tarefas-terminadas');
const skeletonDiv = document.querySelectorAll('#skeleton');

// Variáveis - Localização dos tokens
let tokenJwt = sessionStorage.getItem('jwt');
let localTokenJwt = localStorage.getItem('jwt');


// Função para validação do local do token
const tokenAtual = () => {
    if (localTokenJwt) {
        return localTokenJwt;
    } else if (tokenJwt) {
        return tokenJwt;
    } else {
        return null;
    }
}

// Função para retirada de espaços de um determinado valor informado
function retiraEspacosDeUmValorInformado (recebeValor) {
    return recebeValor.trim();
}

// Função para converter string recebida em minúsculas
function converteValorRecebidoEmMinusculo (recebeValor) {
    return recebeValor.toLowerCase();
}

// Função para construção das mensagens de erro
function constroiMensagemDeErro(mensagemDeErro, campoDeExibicao) {
    campoDeExibicao.innerText = mensagemDeErro;
    campoDeExibicao.style.fontSize = "8";
    campoDeExibicao.style.fontWeight = "bold";
    campoDeExibicao.style.color = "red";
    campoDeExibicao.style.marginTop = "5px";
}

// Função para construção de mensagens informativas
function constroiMensagemInformativa(mensagemInformativa, campoDeExibicao) {
    campoDeExibicao.innerText = mensagemInformativa;
    campoDeExibicao.style.fontSize = "8";
    campoDeExibicao.style.fontWeight = "bold";
    campoDeExibicao.style.color = "grey";
    campoDeExibicao.style.marginTop = "5px";
}

// Função para limpar mensagem de erro
function limpaMensagemDeErro(campoDeExibicao) {
    campoDeExibicao.innerText = "";
}

// Função unificada para a validação dos campos de cadastro e/ou login
function validarCampo(campo) {
	if (campo == campoNome) {
		const nameHasOnlyString = !/\d/g.test(campoNome.value);
		const maxLength = 20;
		const minLength = 2;
		const isNameValid = nameHasOnlyString && campoNome.value.length <= maxLength && campoNome.value.length >= minLength;
		return isNameValid
	}
	else if (campo == campoSobrenome) {
		const surnameHasOnlyString = !/\d/g.test(campoSobrenome.value);
		const maxLength = 30;
		const minLength = 2;
		const isSurnameValid = surnameHasOnlyString && campoSobrenome.value.length <= maxLength && campoSobrenome.value.length >= minLength;
		return isSurnameValid
	}
	else if (campo == campoEmail) {
		const emailValue = campoEmail.value;
		const emailRegExValidateString = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(emailValue);
		const isEmailValid = emailRegExValidateString;
		return isEmailValid;
	}
	else if (campo == campoSenha) {
		const minLength = 8;
		const maxLength = 16;
		const passwordValue = campoSenha.value;
		const isPasswordValid = passwordValue.length >= minLength && passwordValue.length <= maxLength;
		return isPasswordValid;
	}
	else if (campo == campoConfirmaSenha) {
		const isBothPasswordsEqual = campoSenha.value === campoConfirmaSenha.value;
		return isBothPasswordsEqual;
	}
	else if (campo == campoNovaTarefa) {
		const minLength = 2;
		const isTarefaValid = campoNovaTarefa.value.length >= minLength;
		return isTarefaValid;
	}
}