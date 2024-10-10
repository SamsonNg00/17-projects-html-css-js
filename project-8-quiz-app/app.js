// Quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2, // Index of the correct answer
  },
  {
    question: "Which language is used for web apps?",
    answers: ["Python", "JavaScript", "Java", "C#"],
    correct: 1,
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Jupiter", "Mars", "Saturn"],
    correct: 1,
  },
];

// Select elements
const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const answerTextElements = [
  document.getElementById("answer-text-1"),
  document.getElementById("answer-text-2"),
  document.getElementById("answer-text-3"),
  document.getElementById("answer-text-4"),
];
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// Function to load a quiz question
function loadQuestion() {
  const currentQuizData = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuizData.question;

  // Load answer choices
  currentQuizData.answers.forEach((answer, index) => {
    answerTextElements[index].textContent = answer;
    answerElements[index].checked = false;
  });
}

// Function to get the selected answer index
function getSelectedAnswerIndex() {
  let selectedAnswerIndex = -1;
  answerElements.forEach((answerElement, index) => {
    if (answerElement.checked) {
      selectedAnswerIndex = index;
    }
  });
  return selectedAnswerIndex;
}

// Function to check the answer and move to the next question
function checkAnswer() {
  const selectedAnswerIndex = getSelectedAnswerIndex();

  if (selectedAnswerIndex === -1) {
    alert("Please select an answer");
    return;
  }

  // Check if the selected answer is correct
  if (selectedAnswerIndex === quizData[currentQuestionIndex].correct) {
    score++;
  }

  // Move to the next question or show results
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Function to show quiz results
function showResults() {
  document.getElementById("quiz").classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

// Load the first question when the page loads
loadQuestion();

// Add event listeners
submitBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartQuiz);
