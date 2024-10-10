// Select elements
const bmiForm = document.getElementById("bmi-form");
const bmiValueDisplay = document.getElementById("bmi-value");
const bmiCategoryDisplay = document.getElementById("bmi-category");

// Function to calculate BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(2);
}

// Function to determine BMI category
function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

// Event listener for form submission
bmiForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (weight > 0 && height > 0) {
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);

    // Display BMI result and category
    bmiValueDisplay.textContent = `Your BMI: ${bmi}`;
    bmiCategoryDisplay.textContent = `Category: ${bmiCategory}`;
  } else {
    bmiValueDisplay.textContent =
      "Please enter valid values for weight and height.";
    bmiCategoryDisplay.textContent = "";
  }
});
