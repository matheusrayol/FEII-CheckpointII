// Criação do objeto que receberá as informações de cadastro para envio
const cadastroUsuarioObjeto = {
	firstName: '',
	lastName: '',
	email: '',
	password: ''
}

// Event Listener - Campo de Nome
campoNome.addEventListener('input', () => { 
  // Verifica se o campo Nome foi preenchido corretamente.
  if (validarCampo(campoNome)) {
		campoNome.style.border = "3px solid #5369f8";
		limpaMensagemDeErro(campoNomeMensagem);
	} else if (campoNome.value == "") {
        campoNome.style.border = "3px solid #ced4da"
        limpaMensagemDeErro(campoNomeMensagem)
    } else {
		campoNome.style.border = "3px solid red";
		constroiMensagemDeErro("O nome deve possuir ao menos 2 caracteres.", campoNomeMensagem);
	}
});

// Event Listener - Campo de Sobrenome
campoSobrenome.addEventListener('input', () => {
  // Verifica se o campo Nome foi preenchido corretamente.
  if (validarCampo(campoSobrenome)) {
		campoSobrenome.style.border = "3px solid #5369f8";
		limpaMensagemDeErro(campoSobrenomeMensagem);
	} else if (campoSobrenome.value == "") {
        campoSobrenome.style.border = "3px solid #ced4da";
        limpaMensagemDeErro(campoSobrenomeMensagem);
    } else {
		campoSobrenome.style.border = "3px solid red";
		constroiMensagemDeErro("O sobrenome deve possuir ao menos 2 caracteres.", campoSobrenomeMensagem);
	}
});

// Event Listener - Campo de Email
campoEmail.addEventListener('input', () => {
  // Verifica se o campo Email foi preenchido corretamente.
  if (validarCampo(campoEmail)) {
		campoEmail.style.border = "3px solid #5369f8";
		limpaMensagemDeErro(campoEmailMensagem);
	} else if (campoEmail.value == "") {
        campoEmail.style.border = "3px solid #ced4da";
        limpaMensagemDeErro(campoEmailMensagem);
    } else {
		campoEmail.style.border = "3px solid red";
		constroiMensagemDeErro("O e-mail deve possuir o formato seu@email.com", campoEmailMensagem);
	}
});

// Event Listener - Campo de Senha
campoSenha.addEventListener('input', () => {
  // Verifica se o campo Senha foi preenchido corretamente.
  if (validarCampo(campoSenha)) {
		campoSenha.style.border = "3px solid #5369f8";
		limpaMensagemDeErro(campoSenhaMensagem);
	} else if (campoSenha.value == "") {
        campoSenha.style.border = "3px solid #ced4da";
        limpaMensagemDeErro(campoSenhaMensagem);
    } else {
		campoSenha.style.border = "3px solid red";
		constroiMensagemDeErro("A senha deve possuir ao menos 8 caracteres.", campoSenhaMensagem);
	}
});

// Event Listener - Campo de Confirmação de Senha
campoConfirmaSenha.addEventListener('input', () => {
  // Verifica se o campo Confirmação de Senha corresponde ao conteúdo do campo Senha.
  if (validarCampo(campoConfirmaSenha)) {
		campoConfirmaSenha.style.border = "3px solid #5369f8";
		limpaMensagemDeErro(campoConfirmaSenhaMensagem);
	} else if (campoConfirmaSenha.value == "") {
        campoConfirmaSenha.style.border = "3px solid #ced4da";
        limpaMensagemDeErro(campoConfirmaSenhaMensagem);
    } else {
		campoConfirmaSenha.style.border = "3px solid red";
		constroiMensagemDeErro("As senhas informadas não correspondem.", campoConfirmaSenhaMensagem);
	}
});

// Event Listener - Botão de Submit
botaoCadastro.addEventListener('click', (event) => {
	event.preventDefault();
  // Verifica se todos os campos foram preenchidos corretamente.
	if (validarCadastro()) {
    	// REFATORAÇÃO: Exibe em console o resultado das validações. 
		// Acho que podemos remover as instâncias de console.log de todos os códigos quando terminarmos o desenvolvimento.
		console.log('validateName: ' + validarCampo(campoNome));
		console.log('validateSurname: ' + validarCampo(campoSobrenome));
		console.log('validateEmail: ' + validarCampo(campoEmail));
		console.log('validatePassword: ' + validarCampo(campoSenha));
		console.log('validatePasswordConfirmation: ' + validarCampo(campoConfirmaSenha));

		// Atribui os valores dos campos de cadastro ao objeto de cadastro.
		cadastroUsuarioObjeto.firstName = campoNome.value;
		cadastroUsuarioObjeto.lastName = campoSobrenome.value;
		cadastroUsuarioObjeto.email = campoEmail.value;
		cadastroUsuarioObjeto.password = campoSenha.value;

		// Converte o objeto em uma string JSON
		const cadastroUsuarioObjetoEmString = JSON.stringify(cadastroUsuarioObjeto);

		// Prepara o envio do objeto JSON para a API de cadastro
		const signupUrlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/users";
		const configuracaoDaRequisicao = {
			method: 'POST',
			body: cadastroUsuarioObjetoEmString,
			headers: {
				'Content-Type': 'application/json'
			}
		}

		// Envia a requisição para a API de cadastro
		fetch(signupUrlEndpoint, configuracaoDaRequisicao).then(
			// Recebe a resposta da API de cadstro
			resultado => {
				// Verifica o status da resposta
				// Se o status for 201, o cadastro foi efetuado com sucesso
				if (resultado.status == 201) {
					return resultado.json();
				}
				throw resultado;

			}
		).then(
			// Recebe o objeto JSON da API de cadastro
			resultado => { 
        // Chama a função sucessoNoCadastro para continuar a requisição
				sucessoNoCadastro(resultado.jwt);
			}
		).catch(erro => {
			// Caso o cadastro não tenha sido bem-sucedido, informa o erro no console
			// e exibe a mensagem abaixo do formulário de cadastro.
			erroNoCadastro(erro.status);
		})


	} else {
		event.preventDefault();
		constroiMensagemDeErro("Todos os campos do cadastro são obrigatórios. Verifique mensagens de erro e corrija os campos necessários.", statusCadastroMensagem);
	}
});

// Função de retorno em caso de sucesso no login
function sucessoNoCadastro(tokenRecebido) {
	// Exibe no console a resposta recebida da API de login
	console.log(`JSON Recebido: ${tokenRecebido}`);
	// Altera a mensagem de erro para informar que o login foi bem-sucedido
	constroiMensagemInformativa("Cadastro concluído! Redirecionando...", statusCadastroMensagem);

	setTimeout(() => {location.href = "index.html";}, 1500);	
}

// Função de retorno em caso de erro no login
function erroNoCadastro(statusRecebido) {
	// Exibe no console o status da resposta da API de login
	console.log(`Status recebido: ${statusRecebido}`);

	// Altera a mensagem de erro para informar que o login não foi bem-sucedido
	if (statusRecebido == 400) {
		console.log("Este usuário já está registrado, ou os dados informados estão incompletos.");
		constroiMensagemDeErro("Este usuário já está registrado, ou os dados informados estão incompletos.", statusCadastroMensagem);
	} else if (statusRecebido == 500) {
    console.log("Ocorreu um erro no servidor. Tente novamente mais tarde.");
    constroiMensagemDeErro("Ocorreu um erro no servidor. Tente novamente mais tarde.", statusCadastroMensagem);
  } else {
		limpaMensagemDeErro(statusCadastroMensagem)
	}
	validarCadastro();
}



// // Validação do campo Nome
// const validateName = () => {
// 	const nameHasOnlyString = !/\d/g.test(campoNome.value);
// 	const maxLength = 20;
// 	const minLength = 2;
// 	const isNameValid = nameHasOnlyString && campoNome.value.length <= maxLength && campoNome.value.length >= minLength;
// 	return isNameValid
// }

// // Validação do campo Sobrenome
// const validateSurname = () => {
// 	const surnameHasOnlyString = !/\d/g.test(campoSobrenome.value);
// 	const maxLength = 30;
// 	const minLength = 2;
// 	const isSurnameValid = surnameHasOnlyString && campoSobrenome.value.length <= maxLength && campoSobrenome.value.length >= minLength;
// 	return isSurnameValid
// }

// // Validação do campo E-mail
// const validateEmail = () => {
// 	const emailValue = campoEmail.value;
// 	const emailRegExValidateString = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(emailValue);
// 	const isEmailValid = emailRegExValidateString;
// 	return isEmailValid;
// }

// // Validação do campo de Senha
// const validatePassword = () => {
// 	const minLength = 8;
// 	const maxLength = 16;
// 	const passwordValue = campoSenha.value;
// 	const isPasswordValid = passwordValue.length >= minLength && passwordValue.length <= maxLength;
// 	return isPasswordValid;
// }

// // Validação dos campos de Senha
// const validatePasswordConfirmation = () => {
// 	const isBothPasswordsEqual = campoSenha.value === campoConfirmaSenha.value;
// 	return isBothPasswordsEqual;
// }

// Validação dos campos de cadastro
const validarCadastro = () => {
	if (validarCampo(campoNome) && validarCampo(campoSobrenome) && validarCampo(campoEmail) && validarCampo(campoSenha) && validarCampo(campoConfirmaSenha)) {
		return true;
	} else {
		return false;
	}
}