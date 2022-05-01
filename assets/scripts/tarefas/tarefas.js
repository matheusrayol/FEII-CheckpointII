onload = function () {
    // Verifica se o token está presente no localStorage
    if (tokenAtual()) {
        // Captura o nome do usuário para exibição na página
        efetuaRequisicao('getMe');

        // Remove a seção que bloqueia a página em caso do usuário não estar logado
        areaBloqueada.remove();

        // Lista as tarefas do usuário na interface
        efetuaRequisicao('getTasks');

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
    Swal.fire({
        text: "Deseja encerrar a sessão agora?",
        icon: 'question',
        background: 'var(--cor-fundo)',
        color: 'var(--cor-texto)',
        showCancelButton: true,
        confirmButtonColor: 'var(--cor-destaque)',
        cancelButtonColor: 'var(--bs-danger)',
        confirmButtonText: 'Encerrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem('jwt');
            localStorage.removeItem('jwt');
            location.href = 'index.html';
        }
    })
});

// Event Listener para o campo de nova tarefa
campoNovaTarefa.addEventListener('input', () => {

    if (validarCampo(campoNovaTarefa)) {
        campoNovaTarefa.style.border = "3px solid #5369f8";
        limpaMensagem(campoNovaTarefaMensagem);
    }
    else if (campoNovaTarefa.value == "") {
        campoNovaTarefa.style.border = "3px solid #ced4da";
        limpaMensagem(campoNovaTarefaMensagem);
    }
    else {
        campoNovaTarefa.style.border = "3px solid red";
        constroiMensagem("erro", "A nova tarefa deve conter no mínimo 2 caracteres.", campoNovaTarefaMensagem);
    }
})

// Event Listener para cadastrar nova tarefa na área logada
botaoNovaTarefa.addEventListener('click', (evento) => {
    evento.preventDefault();
    if (validarCampo(campoNovaTarefa)) {
        efetuaRequisicao('createTask');
    } else {
        evento.preventDefault();
    }
})

// Função para excluir uma tarefa concluída
function removerTarefa(tarefaId) {

    Swal.fire({
        title: 'Excluir tarefa?',
        text: "Esta ação não pode ser desfeita!",
        icon: 'question',
        background: 'var(--cor-fundo)',
        color: 'var(--cor-texto)',
        showCancelButton: true,
        confirmButtonColor: 'var(--cor-destaque)',
        cancelButtonColor: 'var(--bs-danger)',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            efetuaRequisicao('deleteTask', tarefaId);
        }
    })

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

                if (evento.keyCode === 13 && input.value != "") {
                    evento.preventDefault();

                    let urlEndpoint = "https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/" + tarefaId;

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
        }
    });
}