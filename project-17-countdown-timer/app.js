// Select elements
const countdownForm = document.getElementById("countdown-form");
const dateTimeInput = document.getElementById("date-time");
const countdownDisplay = document.getElementById("countdown");
const daysDisplay = document.getElementById("days");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

let countdownInterval;

// Function to update the countdown
function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculate time left
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the display
  daysDisplay.textContent = days < 10 ? `0${days}` : days;
  hoursDisplay.textContent = hours < 10 ? `0${hours}` : hours;
  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;

  // If countdown is finished, stop the countdown
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownDisplay.innerHTML = "<h2>Countdown finished!</h2>";
  }
}

// Function to start the countdown
function startCountdown(event) {
  event.preventDefault();

  // Get the selected date and time
  const targetDate = new Date(dateTimeInput.value).getTime();

  // Clear any previous interval
  clearInterval(countdownInterval);

  // Start the countdown
  countdownInterval = setInterval(() => {
    updateCountdown(targetDate);
  }, 1000);
}

// Add event listener to the form
countdownForm.addEventListener("submit", startCountdown);
