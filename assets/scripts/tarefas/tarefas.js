// Captura dos elementos
let areaConectada = document.getElementById('area-logada');
let areaBloqueada = document.getElementById('area-alerta');
let campoUsername = document.getElementById('user-name');
let botaoSair = document.getElementById('encerrar-sessao');
let contarCaracteres = document.getElementById('character-count');
let campoNovaTarefa = document.getElementById('nova-tarefa');
let botaoNovaTarefa = document.getElementById('adicionar-tarefa');
let tarefasPendentes = document.getElementById('tarefas-pendentes');
let tarefasConcluidas = document.getElementById('tarefas-terminadas');
let skeletonDiv = document.querySelectorAll('#skeleton');

onload = function () {
    // Verifica se o token está presente no localStorage
    if (tokenAtual()) {
        // Captura o nome do usuário para exibição na página
        exibeNome();

        // Remove a seção que bloqueia a página em caso do usuário não estar logado
        areaBloqueada.remove();

        // Lista as tarefas do usuário na interface
        listarTarefas();

        // Exibe a seção que contém a lista de tarefas do usuário
        areaConectada.removeAttribute('hidden');
    }
    // Se o token não existir, o usuário não está logado
    else {
        // Remove a seção que contém a lista de tarefas do usuário
        areaConectada.remove();

        // Redireciona o usuário para a área de alerta
        areaBloqueada.removeAttribute('hidden');
    }

}

// Listener para o contador de caracteres no campo de nova tarefa
campoNovaTarefa.onkeyup = function () {
    contarCaracteres.innerHTML = 140 - this.value.length;
};

// Listener para o botão de logout
botaoSair.addEventListener('click', function () {
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('jwt');
    location.href = 'index.html';
});

// função para exibição de nome do usuário logado
function exibeNome() {
    const urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

    let headerToken = new Headers();
    headerToken.append('Authorization', tokenAtual())

    const configuracaoDaRequisicao = {
        method: 'GET',
        headers: headerToken,
        redirect: 'follow'
    }

    // Envia a requisição para a API de login
    fetch(urlEndpoint, configuracaoDaRequisicao).then(
        // Recebe a resposta da API de login
        resultado => {
            // Verifica o status da resposta
            // Se o status for 201, o login foi validado com sucesso
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado;
        }
    )
        .then(
            // Recebe o objeto JSON da API de login
            resultado => {
                // Chama a função sucessoNoLogin para continuar a requisição e armazenar o token no localStorage.
                campoUsername.innerText = 'Bem vindo, ' + resultado.firstName;
            }
        )
        .catch(
            erro => {
                // Caso o login não tenha sido bem-sucedido, informa a mensagem no console
                // e exibe a mensagem de erro abaixo do formulário de login.
                console.log(erro);
            }
        );
}

// Função para listar as tarefas do usuário na área logada
function listarTarefas() {
    const urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks";
    const configuracaoRequisicao = {
        method: 'GET',
        headers: {
            'Authorization': tokenAtual()
        }
    }

    fetch(urlEndpoint, configuracaoRequisicao).then(
        resultado => {
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado;
        }
    )
        .then(
            resultado => {
                resultado.forEach(tarefa => {
                    dataFormatada = dayjs(tarefa.createdAt).format('DD/MM/YYYY HH:mm');
                    if (!tarefa.completed) {
                        tarefasPendentes.innerHTML += `<li class="tarefa" id="${tarefa.id}">
                    <div class="not-done" onclick="concluirTarefa(${tarefa.id})">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="descricao gap-3">
                        <p class="nome" id="descricao-${tarefa.id}" onclick="editarTarefa(${tarefa.id})"><span>${tarefa.description}</span></p>
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
                                                <button class="btn btn-tarefas" type="button" onclick="restaurarTarefa(${tarefa.id})">
                                                    <i class="fas fa-undo" data-bs-toggle="tooltip"></i>
                                                </button>
                                                <button class="btn btn-tarefas" type="button" onclick="removerTarefa(${tarefa.id})">
                                                    <i class="fas fa-trash" data-bs-toggle="tooltip"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`;
                    }
                })
                setTimeout(function () {
                    skeletonDiv.forEach(element => {
                        element.removeAttribute('id');
                    });
                }, 300);
            }
        )
        .catch(
            erro => {
                console.log(erro);
            }
        );
}

// Event Listener para cadastrar nova tarefa na área logada
botaoNovaTarefa.addEventListener('click', (evento) => {
    evento.preventDefault();
    if (campoNovaTarefa.value != "") {
        const urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks";

        const objetoTarefa = {
            'description': '',
            'completed': ''
        }

        objetoTarefa.description = campoNovaTarefa.value;
        objetoTarefa.completed = false;

        const objetoTarefaEmJson = JSON.stringify(objetoTarefa);

        const configuracaoRequisicao = {
            method: 'POST',
            headers: {
                'Authorization': tokenAtual(),
                'Content-Type': 'application/json'
            },
            body: objetoTarefaEmJson
        };

        fetch(urlEndpoint, configuracaoRequisicao).then(
            resultado => {
                if (resultado.status == 201) {
                    return resultado.json();
                }
                throw resultado;
            }
        )
            .then(
                resultado => {
                    console.log(resultado);
                    window.location.reload();
                }
            )
            .catch(
                erro => {
                    console.log(erro);
                }
            );
    }
})

// Função para concluir uma tarefa
function concluirTarefa(tarefaId) {
    let urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks/" + tarefaId;

    let headerToken = new Headers();
    headerToken.append("Authorization", tokenAtual());

    const objetoTarefa = {
        'completed': ''
    }

    objetoTarefa.completed = true;

    const objetoTarefaEmJson = JSON.stringify(objetoTarefa);

    const configuracaoRequisicao = {
        method: 'PUT',
        headers: {
            'Authorization': tokenAtual(),
            'Content-Type': 'application/json'
        },
        body: objetoTarefaEmJson
    };

    fetch(urlEndpoint, configuracaoRequisicao).then(
        resultado => {
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado;
        }
    )
        .then(
            resultado => {
                console.log(resultado);
                window.location.reload();
            }
        )
        .catch(
            erro => {
                console.log(erro);
            }
        );

}

// Função para restaurar uma tarefa concluída
function restaurarTarefa(tarefaId) {
    let urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks/" + tarefaId;

    let headerToken = new Headers();
    headerToken.append("Authorization", tokenAtual());

    const objetoTarefa = {
        'completed': ''
    }

    objetoTarefa.completed = false;

    const objetoTarefaEmJson = JSON.stringify(objetoTarefa);

    const configuracaoRequisicao = {
        method: 'PUT',
        headers: {
            'Authorization': tokenAtual(),
            'Content-Type': 'application/json'
        },
        body: objetoTarefaEmJson
    };

    fetch(urlEndpoint, configuracaoRequisicao).then(
        resultado => {
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado;
        }
    )
        .then(
            resultado => {
                console.log(resultado);
                window.location.reload();
            }
        )
        .catch(
            erro => {
                console.log(erro);
            }
        );

}

// Função para excluir uma tarefa concluída
function removerTarefa(tarefaId) {
    let urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks/" + tarefaId;

    let headerToken = new Headers();
    headerToken.append("Authorization", tokenAtual());

    const configuracaoRequisicao = {
        method: 'DELETE',
        headers: {
            'Authorization': tokenAtual(),
        }
    };

    fetch(urlEndpoint, configuracaoRequisicao).then(
        resultado => {
            if (resultado.status == 200) {
                return resultado.json();
            }
            throw resultado;
        }
    )
        .then(
            resultado => {
                console.log(resultado);
                window.location.reload();
            }
        )
        .catch(
            erro => {
                console.log(erro);
            }
        );

}

// Função para editar uma tarefa pendente
function editarTarefa(tarefaId) {
    let tarefaEditada = document.getElementById('descricao-' + tarefaId)
    tarefaEditada.addEventListener('click', (evento) => {

        let span, input, text;

        // Recebe o evento
        evento = evento || window.event;

        // Recebe o elemento raiz do evento
        span = evento.target || evento.srcElement;

        // Caso exista uma tag span dentro do elemento raiz do evento
        if (span && span.tagName.toUpperCase() === 'SPAN') {
            // Oculta o span
            span.style.display = 'none';

            // Busca o texto do span
            text = span.innerHTML;

            // Cria um campo de input
            input = document.createElement('input');
            input.type = "text";
            input.value = text;
            input.classList.add('form-control');
            input.size = text.length + 140;
            span.parentNode.insertBefore(input, span);

            // Foca o input, e adiciona um evento de blur para desfazer a edição
            input.focus();
            input.addEventListener('keyup', (evento) => {

                if (evento.keyCode === 13) {
                    evento.preventDefault();

                    let urlEndpoint = "https://ctd-todo-api.herokuapp.com/v1/tasks/" + tarefaId;

                    let headerToken = new Headers();
                    headerToken.append("Authorization", tokenAtual());

                    const objetoTarefa = {
                        'description': input.value,
                        'completed': false
                    };

                    const objetoTarefaEmJson = JSON.stringify(objetoTarefa);

                    const configuracaoRequisicao = {
                        method: 'PUT',
                        headers: {
                            'Authorization': tokenAtual(),
                            'Content-Type': 'application/json'
                        },
                        body: objetoTarefaEmJson
                    };

                    fetch(urlEndpoint, configuracaoRequisicao).then(
                        resultado => {
                            if (resultado.status == 200) {
                                return resultado.json();
                            }
                            throw resultado;
                        })
                        .then(
                            resultado => {
                                console.log(resultado);
                                window.location.reload();
                            }
                        )
                        .catch(
                            erro => {
                                console.log(erro);
                            }
                        );

                }

            }
            );

            input.onblur = function () {
                // Remove o input
                span.parentNode.removeChild(input);

                // Atualiza o span
                span.innerHTML = input.value == "" ? "&nbsp;" : input.value;

                // Exibe o span
                span.style.display = '';
            }
        }
    });
}