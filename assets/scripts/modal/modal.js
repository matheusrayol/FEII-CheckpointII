//Abre o modal
const openModal = document.querySelector(".modal-github");

//Fecha o modal
const closeModal = document.querySelector("#close-modal");

//Container modal
const containerModal = document.querySelector("#container-modal");


//Funções que abrem e fecham o modal
openModal.addEventListener('click', () =>
{
    containerModal.classList.add('show');
})


closeModal.addEventListener('click', () =>
{
    containerModal.classList.remove('show');
})


//Abrem o github/linkedin dos participantes ao clicar no botão

const henrique = document.querySelector('#henrique-img');
const matheus = document.querySelector('#matheus-img');
const fabio = document.querySelector('#fabio-img');
const pedro = document.querySelector('#pedro-img');


matheus.addEventListener('click', () =>
{
   window.open("https://github.com/matheusrayol", "_blank")
});

henrique.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/henrique-césar/", "_blank")
});

fabio.addEventListener('click', () =>
{
   window.open("https://github.com/neresfabio", "_blank")
});

pedro.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/pedro-marques-a33634178/", "_blank")
});