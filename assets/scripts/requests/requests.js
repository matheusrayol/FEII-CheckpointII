// URL principal da API
const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/';

// Funções para construção das requests na API do To-Do App

// Construtor da requisição
function efetuaRequisicao(tipoRequisicao, idTarefa, statusTarefa) {
    let urlEndpoint;
    let configuracaoRequisicao;

    // Se a requisição for de login,
    // constrói a estrutura para realizar a requisição
    if (tipoRequisicao == 'login') {

        // Normaliza os campos retirando espaços em branco
        campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(campoEmail.value);
        campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(campoSenha.value);

        // Normaliza os caracteres do e-mail para minúsculas
        campoEmailLoginNormalizado = converteValorRecebidoEmMinusculo(campoEmailLoginNormalizado);

        const loginObject = {
            email: campoEmailLoginNormalizado,
            password: campoSenhaLoginNormalizado
        }

        // Prepara o envio do objeto JSON para a API de login
        urlEndpoint = url + 'users/login';
        configuracaoRequisicao = {
            method: 'POST',
            body: JSON.stringify(loginObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    // Se a requisição for de cadastro,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'signup') {
        const signupObject = {
            firstName: campoNome.value,
            lastName: campoSobrenome.value,
            email: campoEmail.value,
            password: campoSenha.value
        }

        // Prepara o envio do objeto JSON para a API de cadastro
        urlEndpoint = url + 'users';
        configuracaoRequisicao = {
            method: 'POST',
            body: JSON.stringify(signupObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    // Se a requisição for de tratamento de dados do usuário,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'getMe') {

        // Prepara o envio da requisição para a API 
        // de dados do usuário
        urlEndpoint = url + 'users/getMe';

        configuracaoRequisicao = {
            method: 'GET',
            headers: {
                'Authorization': tokenAtual()
            }
        }

    }

    // Se a requisição for de listagem de tarefas,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'getTasks') {
        urlEndpoint = url + 'tasks';
        configuracaoRequisicao = {
            method: 'GET',
            headers: {
                'Authorization': tokenAtual()
            }
        }
    }

    // Se a requisição for de criação de tarefa,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'createTask') {
        urlEndpoint = url + 'tasks';

        const taskObject = {
            description: '',
            completed: ''
        }

        taskObject.description = campoNovaTarefa.value;
        taskObject.completed = false;

        configuracaoRequisicao = {
            method: 'POST',
            headers: {
                'Authorization': tokenAtual(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObject)
        }
    }

    // Se a requisição for de atualizar uma tarefa,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'updateTask') {
        urlEndpoint = url + 'tasks/' + idTarefa;

        const taskObject = {
            completed: ''
        }

        if (statusTarefa == 'concluir') {
            taskObject.completed = true;
        } else if (statusTarefa == 'restaurar') {
            taskObject.completed = false;
        }

        configuracaoRequisicao = {
            method: 'PUT',
            headers: {
                'Authorization': tokenAtual(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObject)
        }
    }

    // Se a requisição for de exclusão de tarefa,
    // constrói a estrutura para realizar a requisição
    else if (tipoRequisicao == 'deleteTask') {
        urlEndpoint = url + 'tasks/' + idTarefa;

        configuracaoRequisicao = {
            method: 'DELETE',
            headers: {
                'Authorization': tokenAtual()
            }
        }
    }


    // Envia a requisicção para a API
    fetch(urlEndpoint, configuracaoRequisicao).then(
        // Recebe a resposta da API
        resultado => {
            // Verifica o status da resposta, se for 200 
            // ou 201, a requisição foi bem sucedida
            if (resultado.status == 200 || resultado.status == 201) {
                // Converte a resposta em JSON
                return resultado.json();
            }
            throw resultado;
        }
    )
        // Trata a resposta da API
        .then(
            // Recebe o objeto JSON da API
            resultado => {
                // Chama a função de tratamento da resposta da API
                trataRespostaRequisicao('sucesso', resultado, tipoRequisicao);
            }
        )
        // Caso ocorra algum erro na requisição,
        // chama a função de tratamento da resposta da API para
        // analisar o erro e exibir informações relevantes.
        .catch(
            error => {
                trataRespostaRequisicao('erro', error.status, tipoRequisicao);
            }
        )
}

// Função para o tratamento das respostas da API
function trataRespostaRequisicao(statusRecebido, respostaApi, tipoRequisicao) {
    // Requisições bem-sucedidas
    if (statusRecebido == 'sucesso') {
        // Tratamento de requisição de login
        if (tipoRequisicao == 'login') {
            // Constroi mensagem informando do sucesso no login
            // caso o spinner falhe em ser executado
            constroiMensagem("sucesso", "Redirecionando...", statusLoginMensagem);

            // Verifica se o usuário selecionou a opção de
            // manter o login
            if (checkboxManterLogin.checked) {
                // Armazena o token no localStorage se
                // a opção estiver marcada
                localStorage.setItem('jwt', respostaApi.jwt);
            } else {
                // Armazena o token no sessionStorage se
                // a opção estiver desmarcada
                sessionStorage.setItem('jwt', respostaApi.jwt);
            }

            // Redireciona o usuário para a área logada
            setTimeout(() => { location.href = './tarefas.html'; }, 1500);
        }
        // Tratamento de requisição de cadastro
        else if (tipoRequisicao == 'signup') {
            // Constroi mensagem informando do sucesso no cadastro
            // caso o spinner falhe em ser executado
            let timerInterval
            Swal.fire({
                icon: 'success',
                html: 'Cadastro concluído!<br/> Redirecionando para o login...',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })

            // Redireciona o usuário para a área de login
            setTimeout(() => { location.href = './index.html'; }, 1500);
        }
        // Tratamento de requisição de dados do usuário
        else if (tipoRequisicao == 'getMe') {
            // Exibe o nome do usuário na página de tarefas
            campoUsername.innerText = `Olá, ${respostaApi.firstName}!`;
        }
        // Tratamento de requisição de listagem de tarefas
        else if (tipoRequisicao == 'getTasks') {
            // Se o resultado da requisição for vazio,
            // exibe mensagem informando que não há tarefas
            if (respostaApi.length == 0) {
                tarefasPendentes.innerHTML = `<div class="p-4 mb-4 text-center"><h1>Não há tarefas</h1></div>`;
                tituloTarefasConcluidas.setAttribute("hidden", true);
            }
            respostaApi.forEach(tarefa => {
                dataFormatada = dayjs(tarefa.createdAt).format('DD/MM/YYYY HH:mm');
                if (!tarefa.completed) {
                    tarefasPendentes.innerHTML += `<li class="tarefa" id="${tarefa.id}">
                <div class="not-done" onclick="efetuaRequisicao('updateTask', ${tarefa.id}, 'concluir')" data-toggle="tooltip" data-placement="top" title="Concluir tarefa">
                    <i class="fas fa-check"></i>
                </div>
                <div class="descricao gap-3">
                    <p class="nome" id="descricao-${tarefa.id}" onclick="editarTarefa(${tarefa.id})" data-toggle="tooltip" data-placement="top" title="Clique duas vezes na tarefa para editá-la"><span>${tarefa.description}</span></p>
                    <div class="timestamp">
                        <p class="text-center mb-0">Criada em:</p>
                        <p class="text-center mb-0">${dataFormatada}</p>
                    </div>
                </div>
            </li>`;
                }
                else {
                    tarefasConcluidas.innerHTML += `<li class="tarefa" id="${tarefa.id}">
                    <div class="descricao">
                        <div class="container p-0">
                            <div class="row g-0">
                                <div class="col-12 col-lg-8 col-xl-9 d-flex align-items-center">
                                    <p class="m-2 m-sm-1 m-xl-0">${tarefa.description}</p>
                                </div>
                                <div class="col-12 col-lg-4 col-xl-3">
                                    <div class="row g-0 row-cols-1 row-cols-lg-2">
                                        <div class="col d-flex align-items-center p-1">
                                            <p class="m-2 m-sm-1 m-xl-0">Criada em: ${dataFormatada}</p>
                                        </div>
                                        <div class="col d-flex justify-content-evenly align-items-center">
                                            <button class="btn btn-tarefas" type="button" onclick="efetuaRequisicao('updateTask', ${tarefa.id}, 'restaurar')" data-toggle="tooltip" data-placement="top" title="Restaurar tarefa">
                                                <i class="fas fa-undo"></i>
                                            </button>
                                            <button class="btn btn-tarefas" type="button" onclick="removerTarefa(${tarefa.id})" data-toggle="tooltip" data-placement="top" title="Excluir tarefa">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;
                }
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                  })
            })
            setTimeout(function () {
                skeletonDiv.forEach(element => {
                    element.removeAttribute('id');
                });
            }, 300);
        }
        // Tratamento de requisição de criação, atualização
        // e exclusão de tarefas
        else if (tipoRequisicao == 'createTask' || tipoRequisicao == 'updateTask' || tipoRequisicao == 'deleteTask') {
            window.location.reload();
        }

    }
    // Erros de requisição
    else if (statusRecebido == 'erro') {
        // Tratamento de requisição de login
        if (tipoRequisicao == 'login') {
            // Limpa o campo da senha
            campoSenha.value = "";

            // Exibe a mensagem de erro
            if (respostaApi == 400 || respostaApi == 404) {
                constroiMensagemSwal("error", "Falha no login. Verifique o e-mail e senha informados.");
            } else if (respostaApi == 500) {
                constroiMensagemSwal("error", "Ocorreu um erro no servidor. Tente novamente mais tarde");
            } else {
                constroiMensagemSwal("error", "Ocorreu um erro desconhecido. Tente novamente mais tarde");
            }

            // Oculta o spinner
            ocultarSpinner();

            // Valida os campos do formulário
            validarLogin();
        }
        // Tratamento de requisição de cadastro
        else if (tipoRequisicao == 'signup') {
            // Exibe a mensagem de erro
            if (respostaApi == 400) {
                constroiMensagemSwal("error", "Este usuário já encontra-se registrado, ou os dados informados estão incorretos.");
            } else if (respostaApi == 500) {
                constroiMensagemSwal("error", "Ocorreu um erro no servidor. Tente novamente mais tarde");
            } else {
                constroiMensagemSwal("error", "Ocorreu um erro desconhecido. Tente novamente mais tarde");
            }
            // Oculta o spinner
            ocultarSpinner();
            // Valida os campos do formulário
            validarCadastro();
        }
        // Tratamento de requisição de dados do usuário
        else if (tipoRequisicao == 'getMe') {
            console.log(`Falha ao obter as informações do usuário (Erro ${respostaApi})`);
        }
        // Tratamento de requisição de tarefas
        else if (tipoRequisicao == 'getTasks') {
            console.log(`Falha ao obter as tarefas do usuário (Erro ${respostaApi})`);
            tarefasPendentes.innerHTML = `<div class="p-4 mb-4 text-center"><h4>Falha ao obter as tarefas do usuário (Erro ${respostaApi}).</h1></div>`;
            tituloTarefasConcluidas.setAttribute("hidden", true);
        }
        // Tratamento de requisição de criação de tarefa
        else if (tipoRequisicao == 'createTask') {
            console.log(`Falha ao criar a tarefa (Erro ${respostaApi})`);
        }
        // Tratamento de requisição de atualização de tarefa
        else if (tipoRequisicao == 'updateTask') {
            console.log(`Falha ao atualizar a tarefa (Erro ${respostaApi})`);
        }
        // Tratamento de requisição de exclusão de tarefa
        else if (tipoRequisicao == 'deleteTask') {
            constroiMensagemSwal('error', `Falha ao excluir a tarefa (Erro ${respostaApi})`);
        }
    }

}