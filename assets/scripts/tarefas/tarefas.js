// Captura dos elementos
let contarCaracteres = document.getElementById('character-count');
let campoNovaTarefa = document.getElementById('nova-tarefa')
let areaBloqueada = document.getElementById('area-alerta');
let areaConectada = document.getElementById('area-logada');

onload = function () {
    // REFATORAÇÃO: É possível criarmos uma função que executa a verificação do token tanto para o localStorage quanto para o SessionStorage.
    let tokenJwt = sessionStorage.getItem('jwt')

    if (!tokenJwt) {
        areaConectada.remove();
        areaBloqueada.removeAttribute('hidden');
    } else {
        areaBloqueada.remove();
        areaConectada.removeAttribute('hidden');
    }

}

// Contador de caracteres no campo de nova tarefa
campoNovaTarefa.onkeyup = function () {
    contarCaracteres.innerHTML = 140 - this.value.length;
};