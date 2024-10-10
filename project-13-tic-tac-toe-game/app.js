// Select elements
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');

let isXTurn = true; // Track if it's player X's turn
let board = ['', '', '', '', '', '', '', '', '']; // Track the state of the board
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to handle a cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // If the cell is already marked or the game is over, return
  if (board[cellIndex] !== '' || checkWin()) return;

  // Mark the cell for the current player
  board[cellIndex] = isXTurn ? 'X' : 'O';
  cell.textContent = board[cellIndex];

  // Check if there's a winner
  if (checkWin()) {
    gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'} wins!`;
    return;
  }

  // Check for a draw
  if (board.every(cell => cell !== '')) {
    gameStatus.textContent = "It's a draw!";
    return;
  }

  // Switch turns
  isXTurn = !isXTurn;
  gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
}

// Function to check if there's a winner
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === (isXTurn ? 'X' : 'O');
    });
  });
}

// Function to reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => (cell.textContent = ''));
  isXTurn = true;
  gameStatus.textContent = "Player X's turn";
}

// Add event listeners to the cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Add event listener to the restart button
restartBtn.addEventListener('click', resetGame);
