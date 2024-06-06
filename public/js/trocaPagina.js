function saibaMais() {
    window.location.href ='./HTML/sobremim.html';
}

function adotar() {
    window.location.href ='./HTML/adocao.html';
}

function adotarTardia() {
    window.location.href ='./HTML/tardia.html';
}


function relatar() {
    if (sessionStorage.NOME_USUARIO == undefined) {
        Swal.fire({
            title: "Ainda não se cadastrou?",
            text: "Cadastre-se para acessar a comunidade de relatos!",
            icon: "warning",
            width: 380,
            willClose: () => {
                window.location.href ='./HTML/cadastro.html';
            },
            showCancelButton: true,
            confirmButtonColor: "#57233A",
            cancelButtonColor: "#AE4951",
            confirmButtonText: "Já tenho cadastro",
            cancelButtonText: "OK",
            }).then((result) => {
            if (result.isConfirmed) {
                window.location.href ='./HTML/login.html';
            }
          });
    } else {
        window.location.href ='./HTML/relatos.html';
    }
}

function fazerQuiz() {
    if (sessionStorage.NOME_USUARIO == undefined) {
        Swal.fire({
            title: "Ainda não se cadastrou?",
            text: "Cadastre-se para acessar o quiz!",
            icon: "warning",
            width: 380,
            willClose: () => {
                window.location.href ='./HTML/cadastro.html';
            },
            showCancelButton: true,
            confirmButtonColor: "#57233A",
            cancelButtonColor: "#AE4951",
            confirmButtonText: "Já tenho cadastro",
            cancelButtonText: "OK",
            }).then((result) => {
            if (result.isConfirmed) {
                window.location.href ='./HTML/login.html';
            }
        });
    } else {
        window.location.href ='./HTML/quiz.html';
    }
}

function logar() {
    window.location.href ='login.html';
}
