const cards = document.querySelectorAll(".card");
const boardLists = document.querySelectorAll(".board-list");
const addCardButtons = document.querySelectorAll(".add-card-btn");

// for (const card of cards) {
//   card.addEventListener("dragstart", dragStart);
//   card.addEventListener("dragend", dragEnd);

//   //DELETE CARD
//   const deleteBtn = card.querySelector(".delete-btn");
//   deleteBtn.addEventListener("click", () => card.remove);
// }

function initCardEvents(card) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  //DELETE CARD
  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => card.remove());
}

cards.forEach(initCardEvents);

for (const boardList of boardLists) {
  boardList.addEventListener("dragover", dragOver);
  boardList.addEventListener("dragenter", dragEnter);
  boardList.addEventListener("dragleave", dragLeave);
  boardList.addEventListener("drop", dragDrop);
}

//Add new card Feature

addCardButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardText = prompt("enter card tex");

    if (!cardText) return;

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", "true");
    newCard.id = "card" + Date.now(); // unique id

    // console.log(newCard.id);

    newCard.innerHTML = `${cardText} <button class="delete-btn">❌</button>`;

    //Add  to the correct column
    btn.before(newCard);

    // Iniatilize drag + delete events for the new card
    initCardEvents(newCard);
  });
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(e) {
  console.log(e);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);

  this.appendChild(card);

  this.classList.remove("over");
}
