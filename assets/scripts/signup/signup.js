// Captura dos campos necessários para as validações de cadastro
const campoNome = document.getElementById('nameInput');
const campoNomeMensagem = document.getElementById('nameInputMessage');
const campoSobrenome = document.getElementById('surnameInput');
const campoSobrenomeMensagem = document.getElementById('surnameInputMessage');
const campoEmail = document.getElementById('emailInput');
const campoEmailMensagem = document.getElementById('emailInputMessage');
const campoSenha = document.getElementById('passwordInput');
const campoSenhaMensagem = document.getElementById('passwordInputMessage');
const campoConfirmaSenha = document.getElementById('passwordConfirmInput');
const campoConfirmaSenhaMensagem = document.getElementById('passwordConfirmInputMessage');
const botaoCadastro = document.getElementById('submitButton');
const statusCadastroMensagem = document.getElementById('signupStatusMessage');
const formularioCadastro = document.querySelector('form');

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
	if (validateName()) {
		campoNome.style.border = "1px solid green";
		limpaMensagemDeErro(campoNomeMensagem);
	} else {
		campoNome.style.border = "1px solid red";
		constroiMensagemDeErro("O nome deve possuir ao menos 2 caracteres.", campoNomeMensagem);
	}
});

// Event Listener - Campo de Sobrenome
campoSobrenome.addEventListener('input', () => {
  // Verifica se o campo Nome foi preenchido corretamente.
	if (validateSurname()) {
		campoSobrenome.style.border = "1px solid green";
		limpaMensagemDeErro(campoSobrenomeMensagem);
	} else {
		campoSobrenome.style.border = "1px solid red";
		constroiMensagemDeErro("O sobrenome deve possuir ao menos 2 caracteres.", campoSobrenomeMensagem);
	}
});

// Event Listener - Campo de Email
campoEmail.addEventListener('input', () => {
  // Verifica se o campo Email foi preenchido corretamente.
	if (validateEmail()) {
		campoEmail.style.border = "1px solid green";
		limpaMensagemDeErro(campoEmailMensagem);
	} else {
		campoEmail.style.border = "1px solid red";
		constroiMensagemDeErro("O e-mail deve possuir o formato seu@email.com", campoEmailMensagem);
	}
});

// Event Listener - Campo de Senha
campoSenha.addEventListener('input', () => {
  // Verifica se o campo Senha foi preenchido corretamente.
	if (validatePassword()) {
		campoSenha.style.border = "1px solid green";
		limpaMensagemDeErro(campoSenhaMensagem);
	} else {
		campoSenha.style.border = "1px solid red";
		constroiMensagemDeErro("A senha deve possuir ao menos 8 caracteres.", campoSenhaMensagem);
	}
});

// Event Listener - Campo de Confirmação de Senha
campoConfirmaSenha.addEventListener('input', () => {
  // Verifica se o campo Confirmação de Senha corresponde ao conteúdo do campo Senha.
	if (validatePasswordConfirmation()) {
		campoConfirmaSenha.style.border = "1px solid green";
		limpaMensagemDeErro(campoConfirmaSenhaMensagem);
	} else {
		campoConfirmaSenha.style.border = "1px solid red";
		constroiMensagemDeErro("As senhas informadas não correspondem.", campoConfirmaSenhaMensagem);
	}
});

// Event Listener - Botão de Submit
botaoCadastro.addEventListener('click', (event) => {
  // Verifica se todos os campos foram preenchidos corretamente.
	if (validarCadastro()) {
    // Exibe em console o resultado das validações.
		console.log('validateName: ' + validateName());
		console.log('validateSurname: ' + validateSurname());
		console.log('validateEmail: ' + validateEmail());
		console.log('validatePassword: ' + validatePassword());
		console.log('validatePasswordConfirmation: ' + validatePasswordConfirmation());

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
				if (resultado.status == 200) {
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
	constroiMensagemInformativa("Redirecionando...", statusCadastroMensagem);

  sessionStorage.setItem('jwt', tokenRecebido);
	location.href = "index.html";
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

// Validação do campo Nome
const validateName = () => {
	const nameHasOnlyString = !/\d/g.test(campoNome.value);
	const maxLength = 20;
	const minLength = 2;

	const isNameValid = nameHasOnlyString && campoNome.value.length <= maxLength && campoNome.value.length >= minLength;

	return isNameValid
}

// Validação do campo Sobrenome
const validateSurname = () => {
	const surnameHasOnlyString = !/\d/g.test(campoSobrenome.value);
	const maxLength = 30;
	const minLength = 2;

	const isSurnameValid = surnameHasOnlyString && campoSobrenome.value.length <= maxLength && campoSobrenome.value.length >= minLength;

	return isSurnameValid
}

// Validação do campo E-mail
const validateEmail = () => {
	const emailValue = campoEmail.value;
	const emailRegExValidateString = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(emailValue);
	const isEmailValid = emailRegExValidateString;

	return isEmailValid;
}

// Validação do campo de Senha
const validatePassword = () => {
	const minLength = 8;
	const maxLength = 16;
	const passwordValue = campoSenha.value;

	const isPasswordValid = passwordValue.length >= minLength && passwordValue.length <= maxLength;

	return isPasswordValid;
}

// Validação dos campos de Senha
const validatePasswordConfirmation = () => {
	const isBothPasswordsEqual = campoSenha.value === campoConfirmaSenha.value;

	return isBothPasswordsEqual;
}

// Validação dos campos de cadastro
const validarCadastro = () => {
	if (validateName() && validateSurname() && validateEmail() && validatePassword() && validatePasswordConfirmation()) {
		return true;
	} else {
		return false;
	}
}