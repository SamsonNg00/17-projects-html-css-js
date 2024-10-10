// Your ExchangeRate-API key
const apiKey = "001a1042a5670db4d9f02ce6";

// Select elements
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const convertedAmountDisplay = document.getElementById("converted-amount");

// Function to fetch currencies and populate dropdowns
async function fetchCurrencies() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
  );
  const data = await response.json();
  const currencyCodes = data.supported_codes;

  // Populate both dropdowns with currency codes
  currencyCodes.forEach((code) => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");
    optionFrom.value = code[0];
    optionFrom.textContent = `${code[1]} (${code[0]})`;
    optionTo.value = code[0];
    optionTo.textContent = `${code[1]} (${code[0]})`;

    fromCurrencySelect.appendChild(optionFrom);
    toCurrencySelect.appendChild(optionTo);
  });
}

// Function to convert currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // Fetch conversion rate
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`
  );
  const data = await response.json();
  const conversionRate = data.conversion_rate;

  // Calculate converted amount
  const convertedAmount = amount * conversionRate;

  // Update the UI with the converted amount
  convertedAmountDisplay.textContent = convertedAmount.toFixed(2);
}

// Fetch currencies when the page loads
fetchCurrencies();

// Add event listener to convert button
convertBtn.addEventListener("click", convertCurrency);
