// Event Listener - Campo de Nome
campoNome.addEventListener('input', () => { 
  // Verifica se o campo Nome foi preenchido corretamente.
  if (validarCampo(campoNome)) {
		campoNome.style.border = "3px solid #5369f8";
		limpaMensagem(campoNomeMensagem);
	} else if (campoNome.value == "") {
        campoNome.style.border = "3px solid #ced4da"
        limpaMensagem(campoNomeMensagem)
    } else {
		campoNome.style.border = "3px solid red";
		constroiMensagem("erro", "O nome deve possuir ao menos 2 caracteres.", campoNomeMensagem);
	}
});

// Event Listener - Campo de Sobrenome
campoSobrenome.addEventListener('input', () => {
  // Verifica se o campo Nome foi preenchido corretamente.
  if (validarCampo(campoSobrenome)) {
		campoSobrenome.style.border = "3px solid #5369f8";
		limpaMensagem(campoSobrenomeMensagem);
	} else if (campoSobrenome.value == "") {
        campoSobrenome.style.border = "3px solid #ced4da";
        limpaMensagem(campoSobrenomeMensagem);
    } else {
		campoSobrenome.style.border = "3px solid red";
		constroiMensagem("erro", "O sobrenome deve possuir ao menos 2 caracteres.", campoSobrenomeMensagem);
	}
});

// Event Listener - Campo de Email
campoEmail.addEventListener('input', () => {
  // Verifica se o campo Email foi preenchido corretamente.
  if (validarCampo(campoEmail)) {
		campoEmail.style.border = "3px solid #5369f8";
		limpaMensagem(campoEmailMensagem);
	} else if (campoEmail.value == "") {
        campoEmail.style.border = "3px solid #ced4da";
        limpaMensagem(campoEmailMensagem);
    } else {
		campoEmail.style.border = "3px solid red";
		constroiMensagem("erro", "O e-mail deve possuir o formato seu@email.com", campoEmailMensagem);
	}
});

// Event Listener - Campo de Senha
campoSenha.addEventListener('input', () => {
  // Verifica se o campo Senha foi preenchido corretamente.
  if (validarCampo(campoSenha)) {
		campoSenha.style.border = "3px solid #5369f8";
		limpaMensagem(campoSenhaMensagem);
	} else if (campoSenha.value == "") {
        campoSenha.style.border = "3px solid #ced4da";
        limpaMensagem(campoSenhaMensagem);
    } else {
		campoSenha.style.border = "3px solid red";
		constroiMensagem("erro", "A senha deve possuir ao menos 8 caracteres.", campoSenhaMensagem);
	}
});

// Event Listener - Campo de Confirmação de Senha
campoConfirmaSenha.addEventListener('input', () => {
  // Verifica se o campo Confirmação de Senha corresponde ao conteúdo do campo Senha.
  if (validarCampo(campoConfirmaSenha)) {
		campoConfirmaSenha.style.border = "3px solid #5369f8";
		limpaMensagem(campoConfirmaSenhaMensagem);
	} else if (campoConfirmaSenha.value == "") {
        campoConfirmaSenha.style.border = "3px solid #ced4da";
        limpaMensagem(campoConfirmaSenhaMensagem);
    } else {
		campoConfirmaSenha.style.border = "3px solid red";
		constroiMensagem("erro", "As senhas informadas não correspondem.", campoConfirmaSenhaMensagem);
	}
});

// Event Listener - Botão de Submit
botaoCadastro.addEventListener('click', (event) => {
	event.preventDefault();
  // Verifica se todos os campos foram preenchidos corretamente.
	if (validarCadastro()) {

		// Exibe o spinner
		mostrarSpinner();

		// Chama a função que constroi a requisição para o cadastro
        efetuaRequisicao('signup');

	} else {
		event.preventDefault();
		constroiMensagem("erro", "Todos os campos do cadastro são obrigatórios. Verifique mensagens de erro e corrija os campos necessários.", statusCadastroMensagem);
	}
});

// Validação dos campos de cadastro
const validarCadastro = () => {
	if (validarCampo(campoNome) && validarCampo(campoSobrenome) && validarCampo(campoEmail) && validarCampo(campoSenha) && validarCampo(campoConfirmaSenha)) {
		return true;
	} else {
		return false;
	}
}