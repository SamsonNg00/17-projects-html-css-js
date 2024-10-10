// Select elements
const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

// Function to show error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.textContent = message;
  small.style.visibility = "visible";
}

// Function to hide error message
function hideError(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.style.visibility = "hidden";
}

// Function to check if input is empty
function checkRequired(input, message) {
  if (input.value.trim() === "") {
    showError(input, message);
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// Function to validate the form
function validateForm() {
  const isUsernameValid = checkRequired(usernameInput, "Username is required");
  const isPasswordValid = checkRequired(passwordInput, "Password is required");

  return isUsernameValid && isPasswordValid;
}

// Add event listener to form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    alert("Login successful!");
  }
});
