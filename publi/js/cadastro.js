function ocultar1() {

  if (input_senha.type == "password") {
    input_senha.type = "text";
    botao_ocultar1.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_fechado.png">';
  } else {
    input_senha.type = "password";
    botao_ocultar1.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_aberto.png">';
  }
}

function ocultar2() {

  if (input_confirmar_senha.type == "password") {
    input_confirmar_senha.type = "text";
    botao_ocultar2.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_fechado.png">';
  } else {
    input_confirmar_senha.type = "password";
    botao_ocultar2.innerHTML = '<img id="img_ocultar" src="../assets/img/olho_aberto.png">';
  }
}


function cadastrar() {


  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;
  var confirmacaoSenhaVar = input_confirmar_senha.value;
 


  for (var cont = 0; cont < nomeVar.length; cont++) {
    if (nomeVar[cont] == "1" || nomeVar[cont] == "2" || nomeVar[cont] == "3" || nomeVar[cont] == "4" || nomeVar[cont] == "5" || nomeVar[cont] == "6" || nomeVar[cont] == "7" || nomeVar[cont] == "8" || nomeVar[cont] == "9" || nomeVar[cont] == "0") {
      mensagem_erro.innerHTML = "<br>O nome não pode conter número";
      return false;
    }
  }

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
      mensagem_erro.innerHTML = "<br>Preencha todos os campos";
      return false;
    } else if (nomeVar.length <= 2) {
      mensagem_erro.innerHTML = "<br>O nome precisa ter mais de dois dígitos";
      return false;

    } else if (emailVar.indexOf("@") == -1) {
      mensagem_erro.innerHTML = "<br>O email precisa conter um (@)";
      return false;

    } else if (emailVar.indexOf(".") == -1) {
      mensagem_erro.innerHTML = "<br>O email precisa conter um (.)";
      return false;

    } else if (senhaVar.length < 8) {
      mensagem_erro.innerHTML = "<br>A senha deve ter pelo menos 8 dígitos";
      return false;

    } else if (senhaVar != confirmacaoSenhaVar) {
      mensagem_erro.innerHTML = "<br>Senhas não condizentes";
      return false;

    } else {
      mensagem_erro.innerHTML = "<br>Cadastro realizado com sucesso!";
      window.location.replace('login.html');
      // window.location.replace('localhost:3333/HTML/login.html');
    }
  



  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert('ok');


        setTimeout(() => {
          window.location = "login.html";
        }, "2000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);

    });

  return false;
}