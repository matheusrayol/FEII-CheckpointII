//Abrem o github/linkedin dos participantes ao clicar no botão
const henriqueGitHub = document.querySelector('#github-henrique');
const henriqueLinkedin = document.querySelector('#linkedin-henrique');
const matheusGitHub = document.querySelector('#github-matheus');
const matheusLinkedin = document.querySelector('#linkedin-matheus');
const fabioGitHub = document.querySelector('#github-fabio');
const fabioLinkedin = document.querySelector('#linkedin-fabio');
const pedroGitHub = document.querySelector('#github-pedro');
const pedroLinkedin = document.querySelector('#linkedin-pedro');

matheusGitHub.addEventListener('click', () =>
{
   window.open("https://github.com/matheusrayol", "_blank")
});

matheusLinkedin.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/matheusrayol/", "_blank")
});

henriqueGitHub.addEventListener('click', () =>
{
   window.open("https://github.com/HenriqueC4", "_blank")
});

henriqueLinkedin.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/henrique-césar/", "_blank")
});

fabioGitHub.addEventListener('click', () =>
{
   window.open("https://github.com/neresfabio", "_blank")
});

fabioLinkedin.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/fabioneresdejesus/", "_blank")
});

pedroGitHub.addEventListener('click', () =>
{
   window.open("https://github.com/pedromarqs", "_blank")
});

pedroLinkedin.addEventListener('click', () =>
{
   window.open("https://www.linkedin.com/in/pedro-marques-a33634178/", "_blank")
});