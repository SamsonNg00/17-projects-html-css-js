// Game choices
const choices = ["rock", "paper", "scissors"];

// Select elements
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const choiceButtons = document.querySelectorAll(".choice");

// Function to randomly choose Rock, Paper, or Scissors for the computer
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

// Function to play the game
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const resultMessage = `You chose ${playerChoice}, computer chose ${computerChoice}. ${determineWinner(
    playerChoice,
    computerChoice
  )}`;

  resultDisplay.innerHTML = `<p>${resultMessage}</p>`;
  restartBtn.classList.remove("hidden");
}

// Function to restart the game
function restartGame() {
  resultDisplay.innerHTML = `<p>Choose Rock, Paper, or Scissors to start the game.</p>`;
  restartBtn.classList.add("hidden");
}

// Add event listeners to choice buttons
choiceButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const playerChoice = event.target.id;
    playGame(playerChoice);
  });
});

// Add event listener to restart button
restartBtn.addEventListener("click", restartGame);
