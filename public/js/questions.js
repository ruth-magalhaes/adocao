const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

async function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let fkQuiz = 0;
  
  let texto = ""

  switch (true) {
    case (performance >= 90):
      texto = "Excelente :)"
      break
    case (performance >= 70):
      texto = "Parabéns! Você está no caminho certo!"
      break
    case (performance >= 50):
      texto = ""
      break
    default:
      texto = "Pesquise um pouco mais sobre adoção!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${texto}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `

  try {
    const respostaQuiz = await fetch("/usuarios/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuarioServer: sessionStorage.ID_USUARIO
      }),
    });

    if (!respostaQuiz.ok) {
      throw new Error("Houve um erro ao tentar enviar a pontuação!");
    }
    alert('Quiz enviado com sucesso!');

    const buscarQuiz = await fetch("/usuarios/buscarQuiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!buscarQuiz.ok) {
      throw new Error("Houve um erro ao tentar buscar o quiz!");
    }

    const jsonBuscarQuiz = await buscarQuiz.json();
    fkQuiz = parseInt(jsonBuscarQuiz[0]['idQuiz']);

    console.log('fkQuiz: ' + fkQuiz);
    alert('Quiz encontrado com sucesso!');

    const respostaPontuacao = await fetch("/usuarios/pontuacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pontuacaoServer: totalCorrect,
        idUsuarioServer: sessionStorage.ID_USUARIO,
        fkQuizServer: fkQuiz
      }),
    });

    if (!respostaPontuacao.ok) {
      throw new Error("Houve um erro ao tentar enviar a pontuação!");
    }
    alert('Pontuação enviada com sucesso!');

  } catch (error) {
    console.log(`#ERRO: ${error}`);
  }

  return false;
}

const questions = [
  {
    question: "A partir de quantos anos você já pode adotar?",
    answers: [
      { text: "18 anos", correct: true },
      { text: "21 anos", correct: false },
      { text: "25 anos", correct: false },
      { text: "16 anos", correct: false },
    ],
  },
  {
    question: "Qual é o principal processo de adoção?",
    answers: [
      { text: "Adoção ilegal", correct: false },
      { text: "Adoção legal", correct: true },
      { text: "Adoção temporária", correct: false },
      { text: "Adoção contínua", correct: false },
    ],
  },
  {
    question: "Qual é o primeiro estágio do processo de adoção?",
    answers: [
      { text: "Preenchimento de formulários", correct: false },
      { text: "Entrevista", correct: false },
      { text: "Avaliação", correct: true },
      { text: "Aprovação", correct: false },

    ],
  },
  {
    question: "Qual é a prioridade na fila de adoção no Brasil?",
    answers: [
      { text: "Adolescentes", correct: false },
      { text: "Não há prioridade", correct: false },
      { text: "Irmãos biológicos", correct: true },
      { text: "Crianças abaixo de 5 anos", correct: false },

    ],
  },
  {
    question: "Qual documento é essencial para iniciar o processo de adoção no Brasil?",
    answers: [
      { text: "Cadastro Nacional de Adoção", correct: true },
      { text: "Certidão de nascimento", correct: false },
      { text: "Carteira de identidade", correct: false },
      { text: "Comprovante de residência", correct: false },

    ],
  },
  {
    question: "Quem pode adotar no Brasil, segundo a legislação atual?",
    answers: [
      { text: "Apenas casais heterossexuais", correct: false },
      { text: "Casais e pessoas solteiras", correct: true },
      { text: "Apenas quem tem filhos biológicos", correct: false },
      { text: "Apenas residentes permanentes", correct: false },

    ],
  },
  {
    question: "A partir de que idade é considerado adoção tardia?",
    answers: [
      { text: " Acima de 15 anos", correct: false },
      { text: "Acima de 5 anos", correct: false },
      { text: "Acima de 7 anos de idade", correct: true },
      { text: "Adoção de idosos", correct: false },

    ],
  },
  {
    question: "Qual é a etapa final do processo de adoção?",
    answers: [
      { text: "Avaliação psicossocial", correct: false },
      { text: " Entrega de documentos", correct: false },
      { text: " Sentença judicial de adoção", correct: true },
      { text: "Convivência provisória", correct: false },

    ],
  },
];
