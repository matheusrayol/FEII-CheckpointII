// Função para retirada de espaços de um determinado valor informado
function retiraEspacosDeUmValorInformado (recebeValor) {
    return recebeValor.trim();
}

// Função para converter string recebida em minúsculas
function converteValorRecebidoEmMinusculo (recebeValor) {
    return recebeValor.toLowerCase();
}

// Função para construção das mensagens de erro
function constroiMensagemDeErro(mensagemDeErro, campoDeExibicao) {
    campoDeExibicao.innerText = mensagemDeErro;
    campoDeExibicao.style.fontSize = "8";
    campoDeExibicao.style.fontWeight = "bold";
    campoDeExibicao.style.color = "red";
    campoDeExibicao.style.marginTop = "5px";
}

// Função para construção de mensagens informativas
function constroiMensagemInformativa(mensagemInformativa, campoDeExibicao) {
    campoDeExibicao.innerText = mensagemInformativa;
    campoDeExibicao.style.fontSize = "8";
    campoDeExibicao.style.fontWeight = "bold";
    campoDeExibicao.style.color = "grey";
    campoDeExibicao.style.marginTop = "5px";
}

// Função para limpar mensagem de erro
function limpaMensagemDeErro(campoDeExibicao) {
    campoDeExibicao.innerText = "";
}

