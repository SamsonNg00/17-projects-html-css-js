// Select elements
const billAmountInput = document.getElementById('bill-amount');
const tipPercentageSelect = document.getElementById('tip-percentage');
const calculateBtn = document.getElementById('calculate-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const peopleCountInput = document.getElementById('people-count');
const roundTotalCheckbox = document.getElementById('round-total');

// Function to calculate tip
function calculateTip() {
  const billAmount = parseFloat(billAmountInput.value);
  const tipPercentage = parseFloat(tipPercentageSelect.value);
  const peopleCount = parseInt(peopleCountInput.value);
  const roundTotal = roundTotalCheckbox.checked;


  if (isNaN(billAmount) || billAmount <= 0) {
    alert('Please enter a valid bill amount');
    return;
  }

  // Calculate tip and total
  const tipAmount = billAmount * tipPercentage;
  const totalAmount = billAmount + tipAmount;
  const amountPerPerson = totalAmount / peopleCount;

  // Round the total if the checkbox is checked
  if (roundTotal) {
    totalAmount = Math.ceil(totalAmount);
  }

  // Update the UI
  tipAmountDisplay.innerText = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.innerText = `$${totalAmount.toFixed(2)} (Each: $${amountPerPerson.toFixed(2)})`;

}

// Add event listener to calculate button
calculateBtn.addEventListener('click', calculateTip);
