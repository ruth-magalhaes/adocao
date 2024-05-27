var database = require("../database/config")

function listar() {
    console.log("Finalizando questionário para o usuário");
    var instrucaoSql = `
    
    `;
// select count(*) from questionario where pergunta1 = 1;
// select count(*) from questionario where pergunta1 = 2;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};