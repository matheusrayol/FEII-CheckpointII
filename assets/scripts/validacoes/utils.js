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

// Função para construção das mensagens informativas utilizando o Sweet Alert
function constroiMensagemSwal(tipoMensagem, mensagem) {
	Swal.fire({
		icon: tipoMensagem,
		title: 'Ops...',
		text: mensagem
	})
}

// Função para construção das mensagens informativas
function constroiMensagem(tipoMensagem, mensagemDeErro, campoDeExibicao) {
    campoDeExibicao.innerText = mensagemDeErro;
    campoDeExibicao.style.fontSize = "8";
    campoDeExibicao.style.fontWeight = "bold";
	campoDeExibicao.style.marginTop = '5px';
	if (tipoMensagem == 'erro') {
		campoDeExibicao.style.color = 'red';
	}
	else {
		campoDeExibicao.style.color = 'var(--cor-texto)';
	}
}

// Função para limpar mensagem de erro
function limpaMensagem(campoDeExibicao) {
    campoDeExibicao.innerText = "";
}

// Função unificada para a validação dos campos de cadastro, login e nova tarefa
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