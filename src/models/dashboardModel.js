var database = require("../database/config")

function pergunta1() {
    console.log("Finalizando questionário para o usuário");
    var instrucaoSql = `
    select
    count(case when pergunta1 = 1 then 1 end) as Option1,    
    count(case when pergunta1 = 0 then 1 end) as Option2
    from questionario;    
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pergunta2() {
    console.log("Finalizando questionário para o usuário");
    var instrucaoSql = `
    select
    count(case when pergunta2 = 1 then 1 end) as Option1,    
    count(case when pergunta2 = 2 then 1 end) as Option2,  
    count(case when pergunta2 = 3 then 1 end) as Option3,  
    count(case when pergunta2 = 0 then 1 end) as Option4 from questionario;
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function pergunta3() {
    console.log("Finalizando questionário para o usuário");
    var instrucaoSql = `
    select
    count(case when pergunta3 = 1 then 1 end) as Option1,    
    count(case when pergunta3 = 2 then 1 end) as Option2,  
    count(case when pergunta3 = 3 then 1 end) as Option3,  
    count(case when pergunta3 = 0 then 1 end) as Option4 from questionario; 
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pergunta4() {
    console.log("Finalizando questionário para o usuário");
    var instrucaoSql = `
    select
    count(case when pergunta4 = 2 then 1 end) as Option1,    
    count(case when pergunta4 = 6 then 1 end) as Option2,  
    count(case when pergunta4 = 17 then 1 end) as Option3,  
    count(case when pergunta4 = 0 then 1 end) as Option4
    from questionario;  
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pergunta1,
    pergunta2,
    pergunta3,
    pergunta4
};