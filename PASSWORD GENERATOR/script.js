// DOM Elements - all the elements we need from HTML
const passwordInput = document.querySelector("#password");
const lengthSlider = document.querySelector("#length");
const lengthDisplay = document.querySelector("#length-value");
const uppercaseCheckbox = document.querySelector("#uppercase");
const lowercaseCheckbox = document.querySelector("#lowercase");
const numbersCheckbox = document.querySelector("#numbers");
const symbolsCheckbox = document.querySelector("#symbols");
const generateButton = document.querySelector("#generate-btn");
const copyButton = document.querySelector("#copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.querySelector("#strength-label");

// Character sets - available choices
const CHARACTERS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/",
};

// lengthSlider.addEventListener("input", () => {
//   lengthDisplay.textContent = lengthSlider.value;
// });

// function makePassword() {
//   const length = Number(lengthSlider.value);
//   const includeUppercase = uppercaseCheckbox.checked;
//   const includeLowercase = lowercaseCheckbox.checked;
//   const includeNumbers = numbersCheckbox.checked;
//   const includeSymbols = symbolsCheckbox.checked;

//   if (
//     !(includeUppercase || includeLowercase || includeNumbers || includeSymbols)
//   ) {
//     alert("Please select at least one character type");
//     return;
//   }

//   const newPassword = createRandomPassword(
//     length,
//     includeUppercase,
//     includeLowercase,
//     includeNumbers,
//     includeSymbols
//   );

//   passwordInput.value = newPassword;
//   updateStrengthMeter(newPassword);
// }

// function createRandomPassword(
//   length,
//   includeUppercase,
//   includeLowercase,
//   includeNumbers,
//   includeSymbols
// ) {
//   let allCharacters = "";

//   if (includeUppercase) allCharacters += uppercaseLetters;
//   if (includeLowercase) allCharacters += lowercaseLetters;
//   if (includeNumbers) allCharacters += numberCharacters;
//   if (includeSymbols) allCharacters += symbolCharacters;

//   let password = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * allCharacters.length);
//     password += allCharacters[randomIndex];
//   }

//   return password;
// }

// function updateStrengthMeter(password) {
//   const passwordLength = password.length;
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasLowercase = /[a-z]/.test(password);
//   const hasNumbers = /[0-9]/.test(password);
//   const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

//   let strengthScore = 0;

//   strengthScore += Math.min(passwordLength * 2, 40);

//   if (hasUppercase) strengthScore += 15;
//   if (hasLowercase) strengthScore += 15;
//   if (hasNumbers) strengthScore += 15;
//   if (hasSymbols) strengthScore += 15;

//   if (passwordLength < 8) {
//     strengthScore = Math.min(strengthScore, 40);
//   }

//   const safeScore = Math.max(5, Math.min(100, strengthScore));
//   strengthBar.style.width = safeScore + "%";

//   let strengthLabelText = "";
//   let barColor = "";

//   if (strengthScore < 40) {
//     //weak password
//     barColor = "#fc8181";
//     strengthLabelText = "Weak";
//   } else if (strengthScore < 70) {
//     //Medium password
//     barColor = "#fbd38d";
//     strengthLabelText = "Medium";
//   } else {
//     //strong password.
//     barColor = "#68d391";
//     strengthLabelText = "Strong";
//   }

//   strengthBar.style.backgroundColor = barColor;
//   strengthLabel.textContent = strengthLabelText;
// }

// function showCopySuccess() {
//   copyButton.classList.remove("far", "fa-copy");
//   copyButton.classList.add("fas", "fa-check");
//   copyButton.style.color = "#48bb78";

//   setTimeout(() => {
//     copyButton.classList.remove("fas", "fa-check");
//     copyButton.classList.add("far", "fa-copy");
//     copyButton.style.color = "";
//   }, 1500);
// }

// // attach addevent listener to the button
// generateButton.addEventListener("click", makePassword);

// window.addEventListener("DOMContentLoaded", makePassword);

// copyButton.addEventListener("click", function () {
//   if (!passwordInput.value) return;

//   navigator.clipboard
//     .writeText(passwordInput.value)
//     .then(() => showCopySuccess())
//     .catch((err) => console.error("Cant copy password Text", err));
// });

// REFACTORED CODE

//update length display when the slider move
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

const generatePassword = function () {
  const length = +lengthSlider.value;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  // console.log(includeUppercase);

  // check if at least one checkbox check if all checkbox is not checked display alert warning
  if (
    !(includeUppercase || includeLowercase || includeNumbers || includeSymbols)
  ) {
    alert("Please check at least one checkbox");
  }

  // Create new password using function create random password
  const newPassword = createRandomPassword({
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  });

  //display password in input
  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
};

const createRandomPassword = function ({
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
}) {
  let allCharacters = "";

  // uppercase letters, lowercase letters, numbers and symbols store them in allCharacters variables

  if (includeUppercase) allCharacters += CHARACTERS.uppercase;
  if (includeLowercase) allCharacters += CHARACTERS.lowercase;
  if (includeNumbers) allCharacters += CHARACTERS.numbers;
  if (includeSymbols) allCharacters += CHARACTERS.symbols;

  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    return allCharacters[randomIndex];
  }).join("");
};

const updateStrengthMeter = function (password) {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?]/.test(password);

  //
  let score = Math.min(length * 2, 40);
  if (hasUppercase) score += 15;
  if (hasLowercase) score += 15;
  if (hasNumbers) score += 15;
  if (hasSymbols) score += 15;

  if (length < 8) score = Math.min(score, 40);

  const safeScore = Math.max(5, Math.min(100, score));
  strengthBar.style.width = `${safeScore}%`;

  let label = "";
  let color = "";

  if (score < 40) {
    label = "Weak";
    color = "#fc8181";
  } else if (score < 70) {
    label = "Medium";
    color = "#fbd38d";
  } else {
    label = "Strong";
    color = "#68d391";
  }

  strengthBar.style.backgroundColor = color;
  strengthLabel.textContent = label;
};

const showCopySuccess = function () {
  copyButton.classList.replace("fa-copy", "fa-check");
  copyButton.classList.replace("far", "fas");
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.replace("fa-check", "fa-copy");
    copyButton.classList.replace("fas", "far");
    copyButton.style.color = "";
  }, 1500);
};

const copyPassword = function () {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(showCopySuccess)
    .catch((err) => console.error("Failed to copy", err));
};

//EVENT LISTENER
generateButton.addEventListener("click", generatePassword);
window.addEventListener("DOMContentLoaded", generatePassword);
copyButton.addEventListener("click", copyPassword);
