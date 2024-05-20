function ocultar() {

    if(input_senha.type == "password") {
        input_senha.type = "text";
        botao_ocultar.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_fechado.png">' ;
    } else {
        input_senha.type = "password";
        botao_ocultar.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_aberto.png">'; 
    }
}