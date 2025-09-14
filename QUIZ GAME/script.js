// //DOM ELEMENTS
// const startScreen = document.getElementById("start-screen");
// const quizScreen = document.getElementById("quiz-screen");
// const resultScreen = document.getElementById("result-screen");

// const startButton = document.getElementById("start-btn");

// const questionText = document.getElementById("question-text");
// const answersContainer = document.getElementById("answers-container");

// const currentQuestionSpan = document.getElementById("current-question");
// const totalQuestionsSpan = document.getElementById("total-questions");
// const scoreSpan = document.getElementById("score");

// const finalScoreSpan = document.getElementById("final-score");
// const maxScoreSpan = document.getElementById("max-score");

// const resultMessage = document.getElementById("result-message");
// const restartButton = document.getElementById("restart-btn");
// const progressBar = document.getElementById("progress");

// // Quiz questions
// const quizQuestions = [
//   {
//     question: "What is the capital of France?",
//     answers: [
//       { text: "London", correct: false },
//       { text: "Berlin", correct: false },
//       { text: "Paris", correct: true },
//       { text: "Madrid", correct: false },
//     ],
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     answers: [
//       { text: "Venus", correct: false },
//       { text: "Mars", correct: true },
//       { text: "Jupiter", correct: false },
//       { text: "Saturn", correct: false },
//     ],
//   },
//   {
//     question: "What is the largest ocean on Earth?",
//     answers: [
//       { text: "Atlantic Ocean", correct: false },
//       { text: "Indian Ocean", correct: false },
//       { text: "Arctic Ocean", correct: false },
//       { text: "Pacific Ocean", correct: true },
//     ],
//   },
//   {
//     question: "Which of these is NOT a programming language?",
//     answers: [
//       { text: "Java", correct: false },
//       { text: "Python", correct: false },
//       { text: "Banana", correct: true },
//       { text: "JavaScript", correct: false },
//     ],
//   },
//   {
//     question: "What is the chemical symbol for gold?",
//     answers: [
//       { text: "Go", correct: false },
//       { text: "Gd", correct: false },
//       { text: "Au", correct: true },
//       { text: "Ag", correct: false },
//     ],
//   },
// ];

// // QUIZ STATE
// let currentQuestionIndex = 0; // start from the first question
// let score = 0; // user's score because we will calculate the score based on the correct answers
// let answersDisabled = false; // to prevent multiple clicks on answers

// totalQuestionsSpan.textContent = quizQuestions.length; //total number of questions
// maxScoreSpan.textContent = quizQuestions.length; // max score is equal to the number of questions

// // FUNCTIONS
// // Start the quiz
// const startQuiz = function () {
//   currentQuestionIndex = 0; // reset the current question index to 0
//   // scoreSpan.textContent = 0; // reset the score to 0

//   score = 0; // reset the score to 0
//   scoreSpan.textContent = score; // update the score display in the UI

//   startScreen.classList.remove("active"); // hide the start screen
//   quizScreen.classList.add("active"); // show the quiz screen

//   showQuestion(); // if the button is click Show the first question
// };

// // Show the current question and answers
// const showQuestion = function () {
//   answersDisabled = false;

//   const currentQuestion = quizQuestions[currentQuestionIndex]; // get the current question based on the currentQuestionIndex
//   // console.log(currentQuestionIndex);
//   // console.log(currentQuestion);

//   currentQuestionSpan.textContent = currentQuestionIndex + 1; //add 1 to start from the first question because the index starts from 0

//   // Update the progress bar based on the current question index
//   const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
//   progressBar.style.width = progressPercent + "%"; // Set the width of the progress bar based on the current question index
//   // console.log(progressBar.style.width);

//   // console.log(`${progressPercent}%`);

//   questionText.textContent = currentQuestion.question;

//   answersContainer.innerHTML = ""; // Clear previous answers before showing the new question

//   // Create answer buttons dynamically based on the current question's answers
//   // Loop through the answers array and create a button for each answer
//   currentQuestion.answers.forEach((answer) => {
//     const button = document.createElement("button");
//     button.textContent = answer.text;
//     button.classList.add("answer-btn");

//     // Set a data attribute to indicate if the answer is correct or not
//     // This will be used later to check if the answer is correct when the user clicks on
//     button.dataset.correct = answer.correct;
//     console.log(button);

//     button.addEventListener("click", selectAnswer);

//     answersContainer.appendChild(button);
//   });
// };

// // Handle answer selection and check if the answer is correct
// const selectAnswer = function (e) {
//   // If answers are disabled, do nothing
//   if (answersDisabled) return;

//   answersDisabled = true;

//   const selectedButton = e.target;

//   const isCorrect = selectedButton.dataset.correct === "true"; // Check if the selected answer is correct
//   console.log(isCorrect);

//   // Remove the 'correct' and 'incorrect' classes from all buttons before applying new styles
//   Array.from(answersContainer.children).forEach((button) => {
//     // Loop through all answer buttons
//     if (button.dataset.correct === "true") {
//       button.classList.add("correct");
//     } else if (button === selectedButton) {
//       button.classList.add("incorrect");
//     }
//   });

//   // If the answer is correct, increment the score
//   // and update the score display to the dom
//   if (isCorrect) {
//     score++;
//     scoreSpan.textContent = score;
//   }

//   setTimeout(() => {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < quizQuestions.length) {
//       showQuestion();
//     } else {
//       showResults();
//     }
//   }, 1000);
// };

// // Show the results screen and display the final score
// const showResults = function () {
//   quizScreen.classList.remove("active");
//   resultScreen.classList.add("active");

//   finalScoreSpan.textContent = score;

//   const percent = (score / quizQuestions.length) * 100;

//   if (percent === 100) {
//     resultMessage.textContent = "Perfect! You're a genius";
//   } else if (percent >= 80) {
//     resultMessage.textContent = "Great Job! You know your stuff";
//   } else if (percent >= 60) {
//     resultMessage.textContent = "Good effort! Keep learning";
//   } else if (percent >= 40) {
//     resultMessage.textContent = "Not bad! Try Again to improve";
//   } else {
//     resultMessage.textContent = "Keep studying! You'll get better";
//   }
// };

// // Restart the quiz and reset the state

// const restartQuiz = function () {
//   resultScreen.classList.remove("active");
//   startQuiz();
// };

// //EVENT LISTENERS

// startButton.addEventListener("click", startQuiz);
// restartButton.addEventListener("click", restartQuiz);

//REFATORING THE CODE

//DOM ELEMENTS

const screen = {
  startScreen: document.getElementById("start-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultScreen: document.getElementById("result-screen"),
};

const elements = {
  startButton: document.getElementById("start-btn"),

  questionText: document.getElementById("question-text"),
  answersContainer: document.getElementById("answers-container"),

  currentQuestionSpan: document.getElementById("current-question"),
  totalQuestionsSpan: document.getElementById("total-questions"),
  scoreSpan: document.getElementById("score"),

  finalScoreSpan: document.getElementById("final-score"),
  maxScoreSpan: document.getElementById("max-score"),

  resultMessage: document.getElementById("result-message"),
  restartButton: document.getElementById("restart-btn"),
  progressBar: document.getElementById("progress"),
};

// STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = 0;

// QUIZ DATA
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// INITIAL SET UP
elements.totalQuestionsSpan.textContent = quizQuestions.length;
elements.maxScoreSpan.textContent = quizQuestions.length;

//MAIN FUNCTIONS

const startQuiz = function () {
  currentQuestionIndex = 0;
  score = 0;
  elements.scoreSpan.textContent = score;

  switchScreen(screen.startScreen, screen.quizScreen);

  showQuestion();
};

const showQuestion = function () {
  answersDisabled = false;

  const currentQuestionData = quizQuestions[currentQuestionIndex];
  elements.currentQuestionSpan.textContent = currentQuestionIndex + 1;
  updateProgressBar(currentQuestionData);

  elements.questionText.textContent = currentQuestionData.question;
  elements.answersContainer.innerHTML = "";

  currentQuestionData.answers.forEach((answer) => {
    const button = creaAnswerButton(answer.text, answer.correct);
    elements.answersContainer.appendChild(button);
  });
};

const selectAnswer = function (e) {
  if (answersDisabled) return; // Prevent multiple clicks on answers
  answersDisabled = true; // Disable further clicks

  const selectedButton = e.target;
  console.log(selectedButton);

  const isCorrect = selectedButton.dataset.correct === "true";

  highLightAnswer(selectedButton);
  if (isCorrect) updateScore();

  setTimeout(nextQuiz, 1000);
};

const nextQuiz = function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

const showResult = function () {
  switchScreen(screen.quizScreen, screen.resultScreen);

  elements.finalScoreSpan.textContent = score;

  const percent = (score / quizQuestions.length) * 100;
  elements.resultMessage.textContent = getMessageResult(percent);
};

const restartQuiz = function () {
  switchScreen(screen.resultScreen, screen.startScreen);
};

//HELPER FUNCTIONS
const switchScreen = function (hide, show) {
  hide.classList.remove("active");
  show.classList.add("active");
};

const updateProgressBar = function () {
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  elements.progressBar.style.width = `${progressPercent}%`;
  console.log(progressPercent);
};

const creaAnswerButton = function (text, correct) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("answer-btn");
  button.dataset.correct = correct;
  button.addEventListener("click", selectAnswer);
  return button;
};

const highLightAnswer = function (selectedButton) {
  Array.from(elements.answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });
};

const updateScore = function () {
  score++;
  elements.scoreSpan.textContent = score;
};

const getMessageResult = function (percent) {
  if (percent === 100) return `Perfect! youre a genius`;
  if (percent >= 80) return `Great Job! You know your stuff`;
  if (percent >= 60) return `Good effort! Keep learning`;
  if (percent >= 40) return `Not bad! Try Again to improve`;
  return `Keep studying! you'll get better`;
};

//EVENT LISTENERS
elements.startButton.addEventListener("click", startQuiz);
elements.restartButton.addEventListener("click", restartQuiz);
