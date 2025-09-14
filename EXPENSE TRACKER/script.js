//DOM
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// // console.log(transactions);

// const addtransaction = function (e) {
//   e.preventDefault();

//   // get form values
//   const description = descriptionEl.value.trim();
//   const amount = +amountEl.value;

//   //   console.log(description);
//   //   console.log(typeof amount);

//   transactions.push({
//     id: Date.now(),
//     description,
//     amount,
//   });

//   localStorage.setItem("transactions", JSON.stringify(transactions));

//   UpdateTransactionList();
//   updateSummary();

//   transactionFormEl.reset();
// };

// const UpdateTransactionList = function () {
//   transactionListEl.innerHTML = "";
//   const sortedTransactions = [...transactions].reverse();
//   //   console.log(sortedTransactions);

//   sortedTransactions.forEach((transaction) => {
//     const transactionEl = createTransaction(transaction);
//     transactionListEl.appendChild(transactionEl);
//   });
// };

// const createTransaction = function (transaction) {
//   const li = document.createElement("li");
//   li.classList.add("transaction");
//   li.classList.add(transaction.amount > 0 ? "income" : "expense");

//   li.innerHTML = `
//     <span>${transaction.description}</span>
//     <span>
//       ${formatCurrency(transaction.amount)}
//       <button class="delete-btn" onclick="removeTransaction(${
//         transaction.id
//       })">❌</button>
//     </span>
//   `;

//   return li;
// };

// const updateSummary = function () {
//   const balance = transactions.reduce(
//     (acc, transaction) => acc + transaction.amount,
//     0
//   );

//   const income = transactions
//     .filter((transaction) => transaction.amount > 0)
//     .reduce((acc, transaction) => acc + transaction.amount, 0);

//   const expense = transactions
//     .filter((transaction) => transaction.amount < 0)
//     .reduce((acc, transaction) => acc + transaction.amount, 0);

//   balanceEl.textContent = formatCurrency(balance);
//   incomeAmountEl.textContent = formatCurrency(income);
//   expenseAmountEl.textContent = formatCurrency(expense);
// };

// const formatCurrency = function (number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(number);
// };

// const removeTransaction = function (id) {
//   transactions = transactions.filter((transaction) => transaction.id !== id);

//   localStorage.setItem("transactions", JSON.stringify(transactions));

//   UpdateTransactionList();
//   updateSummary();
// };

// // ATTACH EVENT LISTENER TO THE FORM ELEMENT
// transactionFormEl.addEventListener("submit", addtransaction);

// //INITIAL RENDER

// UpdateTransactionList();
// updateSummary();

//REFACTOR CODE
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value.trim();
  const amount = +amountEl.value;

  if (!description || isNaN(amount)) return;

  const newTransaction = {
    id: Date.now(),
    description,
    amount,
  };

  transactions.push(newTransaction);

  //save to loval storage
  saveTransaction();

  //update UI
  renderTransaction();
  updateSummary();

  //reset form
  transactionFormEl.reset();
}

function renderTransaction() {
  transactionListEl.innerHTML = ""; //clear list

  const sortedTransactions = [...transactions].reverse();

  // console.log(sortedTransactions);

  sortedTransactions.forEach((transaction) => {
    transactionListEl.appendChild(createTransactionElement(transaction));
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add(
    "transaction",
    transaction.amount > 0 ? "income" : "expense"
  );

  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
      ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick=removeTransaction(${
        transaction.id
      })>❌</button>
    </span>
  `;

  return li;
}

function updateSummary() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  saveTransaction();
  renderTransaction();
  updateSummary();
}

function saveTransaction() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

removeTransaction();
updateSummary();

//EVENT LISTENER
transactionFormEl.addEventListener("submit", addTransaction);
