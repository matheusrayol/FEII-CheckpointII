onload = function() {
    let tokenJwt = sessionStorage.getItem(jwt)

    if (!tokenJwt) {
        alert("Por favor, efetue o login novamente!");
        location.href = "index.html";
    } else {
        console.log(tokenJwt);
    }

}