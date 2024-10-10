// Select display element
const display = document.getElementById('display');
let currentInput = '0';  // Current input being typed
let operator = null;  // Store the operator (+, -, *, /)
let previousInput = '';  // Store the previous input before the operator
let memory = null;  // Memory storage for MS, MR, MC

// Function to update the display
function updateDisplay(value) {
  display.innerText = value;
}

// Function to handle button click
function handleButtonClick(value) {
  if (display.innerText === 'Error') {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
  }

  if (!isNaN(value) || value === '.') {
    // Handle number or decimal point
    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  } else if (value === 'C') {
    // Handle clear
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
  } else if (value === '=') {
    // Handle equals
    if (operator && previousInput !== '') {
      currentInput = calculate(previousInput, currentInput, operator);
      updateDisplay(currentInput);
      previousInput = '';
      operator = null;
    }
  } else if (value === 'MS') {
    // Memory Save
    memory = currentInput;
  } else if (value === 'MR') {
    // Memory Recall
    if (memory !== null) {
      currentInput = memory;
      updateDisplay(currentInput);
    }
  } else if (value === 'MC') {
    // Memory Clear
    memory = null;
  } else {
    // Handle operator (+, -, *, /)
    if (operator && previousInput !== '') {
      currentInput = calculate(previousInput, currentInput, operator);
      updateDisplay(currentInput);
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '0';
  }
}

// Function to perform calculation
function calculate(first, second, operator) {
  first = parseFloat(first);
  second = parseFloat(second);
  
  switch (operator) {
    case '+':
      return (first + second).toString();
    case '-':
      return (first - second).toString();
    case '*':
      return (first * second).toString();
    case '/':
      if (second === 0) {
        return 'Error';  // Display "Error" for division by zero
      }
      return (first / second).toString();
    default:
      return second;
  }
}

// Add event listeners to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.getAttribute('data-value');
    handleButtonClick(value);
  });
});

// Add event listener for keyboard input
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    handleButtonClick(key);  // Handle number and decimal input
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    handleButtonClick(key);  // Handle operator input
  } else if (key === 'Enter' || key === '=') {
    handleButtonClick('=');  // Handle equals input
  } else if (key === 'Escape') {
    handleButtonClick('C');  // Handle clear input
  }
});
