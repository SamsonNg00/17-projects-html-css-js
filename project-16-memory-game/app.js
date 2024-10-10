// Array to hold images for the memory game
const images = [
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
  "https://media.istockphoto.com/id/505239248/photo/humayun-tomb-new-delhi-india.jpg?s=612x612&w=0&k=20&c=UQTU6YOnVsSklzHi34cOhNW5AhsACDxKLiD9--T-3Kg=",
  "https://imageupscaler.com/wp-content/uploads/2024/07/maple-leaf-enlarged.jpg",
  "https://wallpapers.com/images/featured/image-79gc4p3mqu7an848.jpg",
  "https://cdn.pixabay.com/photo/2018/01/07/15/25/sunset-3067567_1280.jpg",
  "https://img.freepik.com/photos-premium/image-deux-plates-formes-se-reunissant_954932-4140.jpg",
  "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/049/192/597/small_2x/golden-sunrise-over-mountainous-valley-photo.jpg",
];

// Duplicate the images and shuffle the array
const cardsArray = [...images, ...images].sort(() => 0.5 - Math.random());

const gameGrid = document.getElementById("game-grid");
const restartBtn = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Function to create the game grid
function createGameGrid() {
  cardsArray.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-image", image);
    card.addEventListener("click", flipCard);

    const imgElement = document.createElement("img");
    imgElement.src = `${image}`;
    card.appendChild(imgElement);

    gameGrid.appendChild(card);
  });
}

// Function to flip a card
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Function to check if the two flipped cards match
function checkForMatch() {
  const isMatch =
    firstCard.getAttribute("data-image") ===
    secondCard.getAttribute("data-image");
  isMatch ? disableCards() : unflipCards();
}

// Function to disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();

  matches++;
  if (matches === images.length) {
    alert("Congratulations! You found all the pairs!");
  }
}

// Function to unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

// Function to reset the board
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Function to restart the game
function restartGame() {
  gameGrid.innerHTML = "";
  matches = 0;
  cardsArray.sort(() => 0.5 - Math.random());
  createGameGrid();
}

// Initialize the game
createGameGrid();

// Add event listener to restart button
restartBtn.addEventListener("click", restartGame);
