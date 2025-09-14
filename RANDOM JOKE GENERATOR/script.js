const jokeText = document.querySelector("#joke-text");
const jokeButton = document.querySelector("#joke-btn");
const loadingElement = document.querySelector("#loading");

//Store the current joke to avoid showing the same joke twice in a row
let currentJoke = "";

// Main function to fetch a random joke from the API
async function fetchRandomJoke() {
  try {
    //show loading state
    showLoading();

    //Make a request to the jokeAPI
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");

    //check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //Parse the JSON response from the API
    const data = await response.json();

    console.log(data);
    //check if the API returned a joke successfully
    if (data.error) {
      throw new Error(data.message || "Failed to get joke from API");
    }

    //Extract the joke text based on the joke type
    let jokeText = "";

    if (data.type === "single") {
      //single joke
      jokeText = data.joke;
    } else if (data.type === "twopart") {
      //twopart joke
      jokeText = `${data.setup}\n\n${data.delivery}`;
    } else {
      jokeText = "Sorry, this joke format is not supported.";
    }

    //Check if we got the same joke as before
    if (jokeText === currentJoke) {
      // if it's the same joke, try to fetch another one
      console.log("Got the same joke, Get another one");
      setTimeout(fetchRandomJoke, 100);
      return;
    }

    //Display the joke and hide loading
    displayJoke(jokeText);
    hideLoading();
  } catch (error) {
    // console.error("Error Fetching joke:", error);
    handleError(error);
  }
}

//function to show the loading state
function showLoading() {
  //hide the joke text and show the loading spinner
  jokeText.style.display = "none";
  loadingElement.style.display = "flex";

  //Disable the button while loading to prevent multiple requests
  jokeButton.disabled = true;
  jokeButton.textContent = "Loading...";
}

//Function to hide the loading state
function hideLoading() {
  // Show the joke text and hide the loading spinner
  jokeText.style.display = "block";
  loadingElement.style.display = "none";

  //Re-anable the button
  jokeButton.disabled = false;
  jokeButton.textContent = "🎭 Get New Joke";
}

//Function to display a joke on a page
function displayJoke(joke) {
  //Update the joke text with the new joke
  jokeText.textContent = joke;

  //Store this joke as the current one
  currentJoke = joke;
}

//Function to handle errors
function handleError(error) {
  // console.error("Error fetching joke:", error);

  // display in the UI error message
  jokeText.textContent = "Oops! Something went wrong. Please try again";

  hideLoading();
}

//add a click event listener to the joke button
jokeButton.addEventListener("click", fetchRandomJoke);

// optiona: add keyboard support (enter key) for accessibilty
document.addEventListener("keydown", function (e) {
  // check if enter key was presses and the button is not disabled
  if (e.key === "Enter" && !jokeButton.disabled) {
    fetchRandomJoke();
  }
});

//optional: add some initial styling when the page loads
document.addEventListener("DOMContentLoaded", function () {
  //add a subtle entrance animation
  const jokeCard = document.querySelector(".joke-card");
  jokeCard.style.opacity = "0";
  jokeCard.style.transform = "translateY(20px)";

  //Fade in the card after a short delay
  setTimeout(() => {
    jokeCard.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    jokeCard.style.opacity = "1";
    jokeCard.style.transform = "translateY(0)";
  }, 100);
});

//Optional: add a small easter egg - double-click the title for a suprise
document.querySelector("header h1").addEventListener("dblclick", function () {
  this.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    this.style.animation = "";
  }, 500);
});

// Add the shake animation to the CSS (we'll add this via JavaScript for fun)
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
