// Initial settings
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkSession = true;
let isRunning = false;
let timerInterval;
let timeLeft = workTime;

// Select elements
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workBtn = document.getElementById("work-btn");
const breakBtn = document.getElementById("break-btn");

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

// Function to start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      // Switch to break when work session ends
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        if (isWorkSession) {
          timeLeft = breakTime;
          isWorkSession = false;
          workBtn.classList.remove("active");
          breakBtn.classList.add("active");
        } else {
          timeLeft = workTime;
          isWorkSession = true;
          breakBtn.classList.remove("active");
          workBtn.classList.add("active");
        }
        startTimer(); // Auto-start the next session
      }
    }, 1000);

    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  }
}

// Function to pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = isWorkSession ? workTime : breakTime;
  updateTimerDisplay();
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// Switch to work session
workBtn.addEventListener("click", () => {
  if (!isRunning) {
    isWorkSession = true;
    timeLeft = workTime;
    updateTimerDisplay();
    workBtn.classList.add("active");
    breakBtn.classList.remove("active");
  }
});

// Switch to break session
breakBtn.addEventListener("click", () => {
  if (!isRunning) {
    isWorkSession = false;
    timeLeft = breakTime;
    updateTimerDisplay();
    breakBtn.classList.add("active");
    workBtn.classList.remove("active");
  }
});

// Add event listeners to buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize the timer display
updateTimerDisplay();
