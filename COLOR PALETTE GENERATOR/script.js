// const generateBtn = document.getElementById("generate-btn");
// const paletteContainer = document.getElementById("palette-container");
// const colorBoxes = document.querySelectorAll(".color-box");
// const copyBtn = document.querySelector(".copy-btn");

// const generatePalette = function () {
//   const colors = [];

//   for (let i = 0; i < 5; i++) {
//     colors.push(generateRandomColor());
//   }

//   // console.log(colors);

//   updatePaletteDisplay(colors);
// };

// const generateRandomColor = function () {
//   const letters = "0123456789ABCDEF";
//   let color = "#";

//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * letters.length)];
//   }

//   return color;
// };

// const updatePaletteDisplay = function (colors) {
//   colorBoxes.forEach((box, index) => {
//     const color = colors[index];
//     const colorDiv = box.querySelector(".color");
//     const hexValue = box.querySelector(".hex-value");

//     colorDiv.style.backgroundColor = color;
//     hexValue.textContent = color;
//   });
// };

// const showCopySucess = function (element) {
//   element.classList.remove("far", "fa-copy");
//   element.classList.add("fas", "fa-check");

//   setTimeout(() => {
//     element.classList.remove("fas", "fa-check");
//     element.classList.add("far", "fa-copy");
//   }, 1500);
// };

// paletteContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("copy-btn")) {
//     const hexValue = e.target.previousElementSibling.textContent;

//     navigator.clipboard
//       .writeText(hexValue)
//       .then(() => showCopySucess(e.target))
//       .catch((err) => alert(err));
//   } else if (e.target.classList.contains("color")) {
//     const hexValue =
//       e.target.nextElementSibling.querySelector(".hex-value").textContent;

//     navigator.clipboard
//       .writeText(hexValue)
//       .then(() =>
//         showCopySucess(e.target.nextElementSibling.querySelector(".copy-btn"))
//       )
//       .catch((err) => alert(err));
//   }
// });

// generateBtn.addEventListener("click", generatePalette);

// REFACTOR CODE FOR A BETTER READABILITY

// ===== DOM ELEMENTS =====
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("palette-container");
const colorBoxes = document.querySelectorAll(".color-box");

// FUNCTIONS

const generatePalette = function () {
  const colors = Array.from({ length: 5 }, generateRandomColor);
  // console.log(colors);
  updatePaletteDisplay(colors);
};

const generateRandomColor = function () {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * letters.length)]
    ).join("")
  );
};

const updatePaletteDisplay = function (colors) {
  colorBoxes.forEach((box, i) => {
    const color = colors[i];
    // console.log(color);
    box.querySelector(".color").style.backgroundColor = color;
    box.querySelector(".hex-value").textContent = color;
  });
};

const handleCopyLink = function (e) {
  const target = e.target;
  // console.log(target);

  // Case 1: user clicked the copy icon
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = target.previousElementSibling.textContent;
    copyToClipboard(hexValue, target);
    console.log(hexValue);
  }

  //Case 2: user click the color box itself
  if (e.target.classList.contains("color")) {
    const hexValue =
      target.nextElementSibling.querySelector(".hex-value").textContent;
    const copyBtn = target.nextElementSibling.querySelector(".copy-btn");
    copyToClipboard(hexValue, copyBtn);
  }
};

const showCopySucces = function (buttonElement) {
  buttonElement.classList.replace("far", "fas");
  buttonElement.classList.replace("fa-copy", "fa-check");

  setTimeout(() => {
    buttonElement.classList.replace("far", "fas");
    buttonElement.classList.replace("fa-check", "fa-copy");
  }, 1500);
};

const copyToClipboard = function (text, buttonElement) {
  navigator.clipboard
    .writeText(text)
    .then(() => showCopySucces(buttonElement))
    .catch((err) => alert("Failed to copy" + err));
};

//ADDEVENTLISTENERS
generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", handleCopyLink);
