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
        areaBloqueada.remove();
        areaConectada.removeAttribute('hidden');
        startUp();
    } 
    // Se o token não existir, o usuário não está logado
    // Redireciona o usuário para a área de alerta
    else {
        areaConectada.remove();
        areaBloqueada.removeAttribute('hidden');
    }

}

// Listener para o contador de caracteres no campo de nova tarefa
campoNovaTarefa.onkeyup = function () {
    contarCaracteres.innerHTML = 140 - this.value.length;
};