// Captura de campos - Campos comuns entre páginas
const campoEmail = document.getElementById('email-input');
const campoEmailMensagem = document.getElementById('email-input-message');
const campoSenha = document.getElementById('password-input');
const campoSenhaMensagem = document.getElementById('password-input-message');

// Captura de campos - Página de login
const checkboxManterLogin = document.getElementById('manter-login');
const botaoLogin = document.getElementById('submit-button');
const statusLoginMensagem = document.getElementById('login-status-message');
const areaLogin = document.getElementById('login-screen');

// Captura de campos - Página de cadastro
const campoNome = document.getElementById('name-input');
const campoNomeMensagem = document.getElementById('name-input-message');
const campoSobrenome = document.getElementById('surname-input');
const campoSobrenomeMensagem = document.getElementById('surname-input-message');
const campoConfirmaSenha = document.getElementById('password-confirm-input');
const campoConfirmaSenhaMensagem = document.getElementById('password-confirm-input-message');
const botaoCadastro = document.getElementById('submit-button');
const statusCadastroMensagem = document.getElementById('signup-status-message');
const formularioCadastro = document.querySelector('form');

// Captura de campos - Página de tarefas
const areaConectada = document.getElementById('area-logada');
const areaBloqueada = document.getElementById('area-alerta');
const campoUsername = document.getElementById('user-name');
const botaoSair = document.getElementById('encerrar-sessao');
const contarCaracteres = document.getElementById('character-count');
const campoNovaTarefa = document.getElementById('nova-tarefa');
const campoNovaTarefaMensagem = document.getElementById('nova-tarefa-message');
const botaoNovaTarefa = document.getElementById('adicionar-tarefa');
const tarefasPendentes = document.getElementById('tarefas-pendentes');
const tituloTarefasConcluidas = document.querySelector('.titulo-terminadas');
const tarefasConcluidas = document.getElementById('tarefas-terminadas');
const skeletonDiv = document.querySelectorAll('#skeleton');

// Captura de campos - Modal de Participantes
const henriqueGitHub = document.querySelector('#github-henrique');
const henriqueLinkedin = document.querySelector('#linkedin-henrique');
const matheusGitHub = document.querySelector('#github-matheus');
const matheusLinkedin = document.querySelector('#linkedin-matheus');
const fabioGitHub = document.querySelector('#github-fabio');
const fabioLinkedin = document.querySelector('#linkedin-fabio');
const pedroGitHub = document.querySelector('#github-pedro');
const pedroLinkedin = document.querySelector('#linkedin-pedro');

// Captura da localização dos tokens
const tokenJwt = sessionStorage.getItem('jwt');
const localTokenJwt = localStorage.getItem('jwt');