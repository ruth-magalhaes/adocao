// const { finalizar } = require("../controllers/usuarioController");
var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
    SELECT u.idUsuario, u.nome, u.email, u.senha, q.fkUsuario 
FROM usuario u 
LEFT JOIN questionario q ON q.fkUsuario = u.idUsuario 
WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function finalizar(input1, input2, input3, input4, fk_Pergunta_Usuario) {
    console.log("Finalizando questionário para o usuário:", fk_Pergunta_Usuario);
    var instrucaoSql = `
        INSERT INTO questionario (pergunta1, pergunta2, pergunta3, pergunta4, fkUsuario) VALUES ('${input1}', '${input2}', '${input3}', '${input4}', ${fk_Pergunta_Usuario});
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function updateFK(idUsuario) {
    var instrucaoSql = `update questionario set fkUsuario = ${idUsuario} where fkUsuario = null`;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    finalizar,
    updateFK
};