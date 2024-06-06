function analisar() {
    var pergunta1 = document.getElementsByName('input_opcao');
    var input1;
    var pergunta2 = document.getElementsByName('input_qtd');
    var input2;
    var pergunta3 = document.getElementsByName('input_genero');
    var input3;
    var pergunta4 = document.getElementsByName('input_idade');
    var input4;
    var idUsuario = sessionStorage.ID_USUARIO; //vai pegar o id do usuario no select atraves do bd
    var nomeUsuario = sessionStorage.NOME_USUARIO; //vai pegar o nome do usuario atraves do bd
    var idRelatos = 1;

    for (var index = 0; index < pergunta1.length; index++) {
        if (pergunta1[index].checked) {
            input1 = pergunta1[index].value;
            break;
        }
    }
    for (var cont = 0; cont < pergunta2.length; cont++) {
        if (pergunta2[cont].checked) {
            input2 = pergunta2[cont].value;
            break;
        }
    }
    for (var contador = 0; contador < pergunta3.length; contador++) {
        if (pergunta3[contador].checked) {
            input3 = pergunta3[contador].value;
            break;
        }
    }
    for (var conta = 0; conta < pergunta4.length; conta++) {
        if (pergunta4[conta].checked) {
            input4 = pergunta4[conta].value;
            break;
        }
    }

    if (input1 === undefined || input2 === undefined || input3 === undefined || input4 === undefined) {
        alert("É preciso preencher todos os campos para continuar!");
        return; // Adiciona um return aqui para evitar o prosseguimento do código
    } else {
        fetch(`/usuarios/finalizar/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input1Server: input1,
                input2Server: input2,
                input3Server: input3,
                input4Server: input4,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO finalizar()!");

            if (resposta.ok) {
                console.log(resposta);
                window.alert("Questionário finalizado com sucesso " + nomeUsuario + "!");
                updateFK();
                // Redireciona apenas se a resposta for OK
                window.location = "../dashboard/dashboard.html";
            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });

        return false; // Impede o comportamento padrão do formulário
    }

}

function updateFK() {
    var fkUsuario = sessionStorage.ID_USUARIO;

    if (fkUsuario == null) {
        console.log('idUsuario undefined');
    } else {
        fetch(`/usuarios/updateFK`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkUsuarioServer: fkUsuario
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO UPDATE()!");

            if (resposta.ok) {
                console.log(resposta);
                window.alert("Questionário finalizado com sucesso " + nomeUsuario + "!");
                // Redireciona apenas se a resposta for OK
                console.log('idUsuario Update Sucesso');
                usuarioModel.updateFK(fkUsuario)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizaro update da FK! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
                sessionStorage.setItem('ID_QUESTIONARIO', fkUsuario);

                window.location = "../dashboard/dashboard.html";
            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });

    }

}