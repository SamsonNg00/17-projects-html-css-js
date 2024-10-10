// Array of image paths
const images = [
  "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  "https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg",
];

let currentIndex = 0;

// Select elements
const sliderImage = document.getElementById("slider-image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dotsContainer = document.querySelector(".dots-container");

// Function to update the image
function updateImage() {
  sliderImage.src = images[currentIndex];
  updateDots();
}

// Create dots for navigation
function createDots() {
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === currentIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateImage();
    });
    dotsContainer.appendChild(dot);
  });
}

// Function to update the active dot
function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentIndex) {
      dot.classList.add("active");
    }
  });
}

// Event listeners for next and previous buttons
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

// Optionally, add automatic slideshow functionality
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}, 3000); // Change image every 3 seconds

// Initialize the image slider
createDots();
updateImage();
