const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const isRequiredValid = checkRequired([
//     username,
//     email,
//     password,
//     confirmPassword,
//   ]);

//   let isFormValid = isRequiredValid;

//   if (isRequiredValid) {
//     const isUsernameValid = checkLength(username, 3, 15);
//     const isEmailValid = checkEmail(email);
//     const isPasswordValid = checkLength(password, 5, 25);
//     const isPasswordMatch = checkPasswordMatch(password, confirmPassword);

//     isFormValid =
//       isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
//   }

//   if (isFormValid) {
//     alert("Registration successful!");
//     form.reset();
//     document.querySelectorAll(".form-group").forEach((group) => {
//       group.className = "form-group";
//     });
//   }
// });

// function checkEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (emailRegex.test(email.value.trim())) {
//     showSuccess(email);
//     return true;
//   } else {
//     showError(email, "email is not valid");
//     return false;
//   }
// }

// function checkLength(input, min, max) {
//   if (input.value.length < min) {
//     showError(
//       input,
//       `${formatFieldName(input)} must be at least ${min} characters.`
//     );
//     return false;
//   } else if (input.value.length > max) {
//     showError(
//       input,
//       `${formatFieldName(input)} must be less that ${max} characters.`
//     );
//     return false;
//   } else {
//     showSuccess(input);
//     return true;
//   }
// }

// function checkPasswordMatch(input1, input2) {
//   if (input1.value !== input2.value) {
//     showError(input2, "Passwords do not match");
//     return false;
//   } else {
//     showSuccess(input2);
//     return true;
//   }
// }

// function checkRequired(inputArray) {
//   let isValid = true;

//   // console.log(inputArray);

//   inputArray.forEach((input) => {
//     if (input.value.trim() === "") {
//       showError(input, `${formatFieldName(input)} is required`);
//       isValid = false;
//     } else {
//       showSuccess(input);
//     }
//   });

//   return isValid;
// }

// function formatFieldName(input) {
//   //input id: username --> Username
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

// function showError(input, message) {
//   const formGroup = input.parentElement;
//   formGroup.className = "form-group error";
//   const small = formGroup.querySelector("small");
//   small.innerText = message;
// }

// function showSuccess(input) {
//   const formGroup = input.parentElement;
//   formGroup.className = "form-group success";
// }

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Step 1: Check if all required fields are filled
  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);

  //ASSUME THE FORM IS VALID FROM THE START
  let isFormValid = isRequiredValid;

  // STEP 2: IF ALL FIELDS ARE FILLED, VALIDATE THE OTHER RULES BY CHECKING THE USERNAME, EMAIL, PASSWORD,
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 5, 25);
    const isPasswordMatch = checkPasswordMatch(password, confirmPassword);

    // Form is valid only if ALL checks pass
    isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
  }

  //STEP 3: IF THE FORM IS VALID, SHOW SUCCESS MESSAGE AND RESET THE FORM
  if (isFormValid) {
    alert("Registration successfull");
    form.reset();

    // Reset all form-group styles
    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});

//VALIDATION FUNCTION

//CHECK IF THE INPUT LENGTH IS WITHIN LIMIT
function checkLength(input, min, max) {
  const value = input.value.trim();

  if (value.length < min) {
    showError(
      input,
      `${formatFieldname(input)} must be at least ${min} characters`
    );
    return false;
  } else if (value.length > max) {
    showError(
      input,
      `${formatFieldname(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

//CHECK IF EMAIL IS CORRECT
function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `email is not valid`);
    return false;
  }
}

//CHECK IF THE BOTH PASSWORD IS MATCH
function checkPasswordMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Password do not match");
    return false;
  } else {
    showSuccess(pass2);
    return true;
  }
}

//CHECK IF THE REQUIRED FIELD IS NOT EMPTY
function checkRequired(inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldname(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

// HELPER FUNCTIONS

// SHOW ERROR STYLE AND MESSAGE
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  formGroup.querySelector("small").innerText = message;
}

//SHOW SUCCESS MESSAGE STYLE
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

// CAPITALIZE THE INPUT ID (username -> Username)
function formatFieldname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
