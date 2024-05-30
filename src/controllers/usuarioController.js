var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar );
                        res.status(200).json(resultadoAutenticar[0]); // Supondo que você queira enviar apenas o primeiro usuário encontrado

                

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


function finalizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var input1 = req.body.input1Server;
    var input2 = req.body.input2Server;
    var input3 = req.body.input3Server;
    var input4 = req.body.input4Server;
    var fk_Pergunta_Usuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (input1 == undefined) {
        res.status(400).send("Sem resposta1!");
    } else if (input2 == undefined) {
        res.status(400).send("Sem resposta2!");
    } else if (input3 == undefined) {
        res.status(400).send("Sem resposta3!");
    } else if (input4 == undefined) {
        res.status(400).send("Sem resposta4!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.finalizar(input1, input2, input3, input4, fk_Pergunta_Usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updateFK (req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

    if (fkUsuario == null) {
        console.log('idUsuario undefined');
    } else {
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
                            "\nHouve um erro ao realizar o update da FK! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
    }

}

module.exports = {
    autenticar,
    cadastrar,
    finalizar,
    updateFK
}