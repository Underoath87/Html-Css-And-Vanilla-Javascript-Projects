const quoteTextEl = document.querySelector("#quoteText");
const quoteAuthorEl = document.querySelector("#quoteAuthor");
const newQuoteBtn = document.querySelector("#newQuoteBtn");
const voiceBtn = document.querySelector("#voiceBtn");
const copyBtn = document.querySelector("#copyBtn");
const tweetBtn = document.querySelector("#tweetBtn");

//store the lates quote in state variable
let currentQuote = {
  content: "",
  author: "",
};

const QUOTE_API_URL = "https://dummyjson.com/quotes";

//fetch random quote in the api
async function getRandomQuote() {
  //provide immediate feedback by disabling button and changing text
  // const originalText = newQuoteBtn.textContent;
  quoteTextEl.textContent = "Loading...";
  // quoteAuthorEl.textContent = `— ${author || "unknown"}`;

  try {
    const response = await fetch(QUOTE_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const randomQuotes =
      data.quotes[Math.floor(Math.random() * data.quotes.length)];

    currentQuote = {
      content: randomQuotes.quote || "No quote received",
      author: randomQuotes.author || "unknown",
    };

    updateQuoteUI(currentQuote.content, currentQuote.author);

    // console.log(currentQuote);
  } catch (error) {
    console.error("Failed to fetch quote", error);
    updateQuoteUI("Oops! Could not fetch a quote. Please try again.");
  }
}

// display in the UI
function updateQuoteUI(content, author) {
  quoteTextEl.textContent = content;
  quoteAuthorEl.textContent = `— ${author || "Unknown"}`;
}

//read the current quote using the web speech api
function speakQuote() {
  //some browser/ devices may not support speech synthesis
  if (!("speechSynthesis" in window)) {
    alert("Sorry, Speech is not supported in this browser");
  }

  //if already speaking, cancel the current utterance
  //   window.speechSynthesis.cancel();

  const textToSpeak = `${currentQuote.content} by ${currentQuote.author}`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = 1; // 1 is the normal speed
  utterance.pitch = 1; // 1 is the normal pitch
  utterance.volume = 1; // full volume

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) => /en-GB|it-IT/i.test(v.lang));
  if (preferredVoice) utterance.voice = preferredVoice;

  console.log(voices);

  window.speechSynthesis.speak(utterance);
}

//copy quote to the clipboard
async function copyQuote() {
  const text = `${currentQuote.content} — ${currentQuote.author}`;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "✓";
    copyBtn.style.color = "#fff";
    setTimeout(() => (copyBtn.textContent = "📋"), 800);
  } catch (error) {
    console.error("Copy failed", err);
    alert("Could not copy. try selecting and copying manually");
  }
}

//open twitter with a pre-filled tweet
function tweetQuote() {
  if (!currentQuote) {
    alert("Please generate a quote first");
    return;
  }

  const text = `${currentQuote.content} — ${currentQuote.author}`;
  const twitterUrl = new URL("https://twitter.com/intent/tweet");
  twitterUrl.searchParams.set("text", text);
  window.open(twitterUrl.toString(), "_blank");
}

//addeventlistener
newQuoteBtn.addEventListener("click", getRandomQuote);
voiceBtn.addEventListener("click", speakQuote);
copyBtn.addEventListener("click", copyQuote);
tweetBtn.addEventListener("click", tweetQuote);
