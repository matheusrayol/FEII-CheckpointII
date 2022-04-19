// Função para exibição do spinner
function mostrarSpinner() {
    // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
    // dentro de nosso HTML.
    const body = document.querySelector("body");
    
    // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
    const formLogin = document.getElementById("login-wrapper");
    const formSignup = document.getElementById("signup-wrapper");
    
    // Criamos nosso spinner
    const spinnerContainer = document.createElement("div");
    const spinner = document.createElement("div");
    
    // Atribuímos os IDs a cada novo elemento, para poder manipular
    // seus estilos
    spinnerContainer.setAttribute("id", "container-load");
    spinner.setAttribute("id", "load");
    
    // Ocultamos o formulário de registro
    if(formLogin) {
        formLogin.classList.add("hidden");
    }
    if(formSignup) {
        formSignup.classList.add("hidden");
    }
    
    // Adicionamos o Spinner ao nosso HTML.
    spinnerContainer.appendChild(spinner);
    body.appendChild(spinnerContainer);
    
    return;
};


function ocultarSpinner() {   
    // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
    const formLogin = document.getElementById("login-wrapper");
    const formSignup = document.getElementById("signup-wrapper");
    
    // Selecionamos o spinner
    const spinnerContainer = document.getElementById("container-load");
    
    // Removemos o spinner do HTML
    spinnerContainer.remove();
    
    // Removemos a classe que oculta o formulário
    // Ocultamos o formulário de registro
    if(formLogin) {
        formLogin.classList.remove("hidden");
    }
    if(formSignup) {
        formSignup.classList.remove("hidden");
    }
    
    return;
}
   