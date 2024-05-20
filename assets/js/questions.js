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

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
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
}


const questions = [
    {
      question: "A partir de quantos anos você já pode adotar?",
      answers: [
        { text: "18", correct: true },
        { text: "21", correct: false },
        { text: "25", correct: false },
        { text: "16", correct: false },
      ],
    },
    {
      question: "Qual é o principal processo de adoção?",
      answers: [
        { text: "Adoção ilegal.", correct: false },
        { text: "Adoção legal.", correct: true },
        { text: "Adoção temporária.", correct: false },
        { text: "Adoção contínua.", correct: false },
      ],
    },
    {
      question: "Quais são os estágios típicos do processo de adoção?",
      answers: [
        { text: "Preenchimento de formulários e aprovação imediata.", correct: false },
        { text: "Entrevista única e colocação.", correct: false },
        { text: "Avaliação, preparação, aprovação e colocação.", correct: true },
        { text: "Avaliação, entrevista, preparação e aprovação.", correct: false },

      ],
    },
    {
      question: "Quais são os principais requisitos geralmente exigidos dos pais adotivos?",
      answers: [
        { text: "Ter um emprego de alto status e possuir uma casa própria.", correct: false },
        { text: "Não há requisitos específicos.", correct: false },
        { text: " Estabilidade financeira, boa saúde e aprovação do teste de personalidade.", correct: true },
        { text: "Amor, dedicação e carinho.", correct: false },

      ],
    },
    {
        question: "Qual é a diferença entre adoção aberta e fechada?",
        answers: [
          { text: "Na adoção aberta, os pais biológicos têm contato contínuo com a criança, enquanto na adoção fechada não há contato.", correct: true },
          { text: "Na adoção fechada, os pais biológicos têm contato contínuo com a criança, enquanto na adoção aberta não há contato.", correct: false },
          { text: " Não há diferença entre adoção aberta e fechada.", correct: false },
          { text: "Na adoção fechada, ambas famílias interagem. ", correct: false },

        ],
      },
      {
        question: "Quais são os benefícios da adoção para a criança?",
        answers: [
          { text: "Não há benefícios claros.", correct: false },
          { text: "Proporcionar uma família amorosa e oportunidades de crescimento e desenvolvimento saudáveis.", correct: true },
          { text: "Garantir uma renda estável e acesso a uma educação de alta qualidade.", correct: false },
          { text: "Estudar em boas escolas.", correct: false },

        ],
      },
      {
        question: "O que é uma adoção tardia?",
        answers: [
          { text: " Adoção de uma adolescente que já atingiu a idade adulta.", correct: false },
          { text: "Adoção de uma adolescente que está na fase final da adolescência.", correct: false },
          { text: "Adoção de uma criança/adolescente acima de 7 anos de idade.", correct: true },
          { text: "Adoção de idosos.", correct: false },

        ],
      },
      {
        question: "O que é uma adoção de irmãos biológicos?",
        answers: [
          { text: "Adoção de irmãos por pais adotivos diferentes.", correct: false },
          { text: "Adoção de irmãos apenas por um dos pais biológicos.", correct: false },
          { text: "Adoção de irmãos que têm laços genéticos.", correct: true },
          { text: "Adoção de irmãos em que um é filho adotado e outro é filho biológico. ", correct: false },

        ],
      },
  ];