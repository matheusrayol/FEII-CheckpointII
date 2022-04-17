// Captura dos elementos
let areaConectada = document.getElementById('area-logada');
let areaBloqueada = document.getElementById('area-alerta');
let campoUsername = document.getElementById('user-name');
let botaoSair = document.getElementById('encerrar-sessao');
let contarCaracteres = document.getElementById('character-count');
let campoNovaTarefa = document.getElementById('nova-tarefa');
let botaoNovaTarefa = document.getElementById('adicionar-tarefa');
let tarefasPendentes = document.getElementById('tarefas-pendentes');
let tarefasConcluidas = document.getElementById('tarefas-concluidas');

onload = function () {
    // Verifica se o token está presente no localStorage
    if (tokenAtual()) {
        // Captura o nome do usuário para exibição na página
        exibeNome();

        // Remove a seção que bloqueia a página em caso do usuário não estar logado
        areaBloqueada.remove();

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
campoNovaTarefa.onkeyup = () => {
    contarCaracteres.innerHTML = 140 - this.value.length;
};

// Listener para o botão de logout
botaoSair.addEventListener('click', () => {
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
