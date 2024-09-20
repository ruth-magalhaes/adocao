function ocultar() {

    if (input_senha.type == "password") {
        input_senha.type = "text";
        botao_ocultar.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_fechado.png">';
    } else {
        input_senha.type = "password";
        botao_ocultar.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_aberto.png">';
    }
}


var tentativas = 3;
function entrar() {


    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);


    if (tentativas == 0) {
        div_mensagem.innerHTML = `Você chegou ao limite das tentativas! <br> Tente novamente em 5 minutos.`;
        btn_entrar.disabled = true;

        setTimeout(function () {
            tentativas = 3;
            btn_entrar.disabled = false;
        }, 5 * 1000 * 60)
    } else {
        


        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.ID_QUESTIONARIO = json.fkUsuario;


                    console.log("idUsuario" + json);

                    // alert("estou no then do entrar");
                    div_mensagem.innerHTML = `Login efetuado com sucesso!`;

                    setTimeout(function () {
                        if (sessionStorage.ID_QUESTIONARIO == 'null') {
                            window.location = "../HTML/questionario.html";
                        } else {
                            window.location = "../index.html";
                        }
                    }, 1000);

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");
                div_mensagem.innerHTML = `Tentativas restante ${tentativas}`;

                resposta.text().then(texto => {
                    console.error(texto);

                });
            }

        }).catch(function (erro) {
            console.log(erro);
            div_mensagem.innerHTML = `Tentativas restante ${tentativas}`;
        })        


        tentativas--;
        return false;
    }
}

function updateFK() {
    var idUsuario = sessionStorage.ID_USUARIO;
    fetch("/usuarios/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idUsuario
        }),
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO update()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_QUESTIONARIO = json.idUsuario;


                console.log("ID_QUESTIONARIO:" + json);

                // alert("estou no then do update");
            });

        } else {
            verificar()
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);

            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}
