"strict";

const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task");
const todosList = document.querySelector("#todos-list");
const itemsLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.querySelector("#clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.querySelector("#date");
const filters = document.querySelectorAll(".filter");

// STATE VARIABLES STORE DATA
let todos = [];
let currentFilter = "all"; // KEEP TRACK WHICH FILTER IS ACTIVE ALL, ACTIVE, COMPLETED

// const addTodo = function (text) {
//   if (text.trim === "") return;

//   const todo = {
//     id: Date.now(),
//     text,
//     completed: false,
//   };

//   todos.push(todo);

//   saveTodos();
//   renderTodos();

//   taskInput.value = "";
// };

// const renderTodos = function () {
//   todosList.innerHTML = "";

//   const filteredTodos = filterTodos(currentFilter);

//   filteredTodos.forEach((todo) => {
//     const todoItem = document.createElement("li");
//     todoItem.classList.add("todo-item");
//     if (todo.completed) todoItem.classList.add("completed");

//     const checkBoxContainer = document.createElement("label");
//     checkBoxContainer.classList.add("checkbox-container");

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.classList.add("todo-checkbox");
//     checkbox.checked = todo.completed;
//     checkbox.addEventListener("change", () => toggleTodo(todo.id));

//     const checkmark = document.createElement("span");
//     checkmark.classList.add("checkmark");

//     checkBoxContainer.appendChild(checkbox);
//     checkBoxContainer.appendChild(checkmark);

//     const todoText = document.createElement("span");
//     todoText.classList.add("todo-item-text");
//     todoText.textContent = todo.text;

//     const deleteBtn = document.createElement("button");
//     deleteBtn.classList.add("delete-btn");
//     deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
//     deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

//     todoItem.appendChild(checkBoxContainer);
//     todoItem.appendChild(todoText);
//     todoItem.appendChild(deleteBtn);
//     todosList.appendChild(todoItem);
//   });
// };

// const saveTodos = function () {
//   localStorage.setItem("todos", JSON.stringify(todos));
//   updateItemsCount();
//   checkEmptyState();
// };

// const updateItemsCount = function () {
//   const uncompletedTodos = todos.filter((todo) => !todo.completed);
//   itemsLeft.textContent = `${uncompletedTodos?.length} item${
//     uncompletedTodos !== 1 ? "s" : ""
//   } left`;
// };

// const checkEmptyState = function () {
//   const filteredTodos = filterTodos(currentFilter);
//   if (filteredTodos.length === 0) emptyState.classList.remove("hidden");
//   else emptyState.classList.add("hidden");
// };

// const filterTodos = function (filter) {
//   switch (filter) {
//     case "active":
//       return todos.filter((todo) => !todo.completed);
//     case "completed":
//       return todos.filter((todo) => todo.completed);
//     default:
//       return todos;
//   }
// };

// const clearCompleted = function () {
//   todos = todos.filter((todo) => !todo.completed);
//   saveTodos();
//   renderTodos();
// };

// const toggleTodo = function (id) {
//   todos = todos.map((todo) => {
//     if (todo.id === id) {
//       return { ...todo, completed: !todo.completed };
//     }
//     return todo;
//   });
//   saveTodos();
//   renderTodos();
// };

// const deleteTodo = function (id) {
//   todos = todos.filter((todo) => todo.id !== id);
//   saveTodos();
//   renderTodos();
// };

// const loadTodos = function () {
//   const storedTodos = localStorage.getItem("todos");
//   if (storedTodos) todos = JSON.parse(storedTodos);
//   renderTodos();
// };

// const setActiveFilter = function (filter) {
//   currentFilter = filter;

//   filters.forEach((item) => {
//     if (item.getAttribute("data-filter") === filter) {
//       item.classList.add("active");
//     } else {
//       item.classList.remove("active");
//     }
//   });

//   renderTodos();
// };

// filters.forEach((filter) => {
//   filter.addEventListener("click", () => {
//     setActiveFilter(filter.getAttribute("data-filter"));
//   });
// });

// function setDate() {
//   const options = { weekday: "long", month: "short", day: "numeric" };
//   const today = new Date();
//   dateElement.textContent = today.toLocaleDateString("en-US", options);
// }

// //ADDEVENTLISTENER
// addTaskBtn.addEventListener("click", () => {
//   addTodo(taskInput.value);
// });

// taskInput.addEventListener("keydown", (e) => {
//   if (e.key === "enter") addTodo(taskInput.value);
// });

// clearCompletedBtn.addEventListener("click", clearCompleted);

// window.addEventListener("DOMContentLoaded", () => {
//   loadTodos();
//   updateItemsCount();
//   setDate();
// });

// =======================
// ADD A NEW TODO
// =======================
const addTodo = function (text) {
  //prevent adding empty task
  if (text.trim() === "") return;

  // create new object todo
  const todo = {
    id: Date.now(), // unique id based on current time
    text, // task user type when adding new task in the input field
    completed: false, // start as not completed default
  };

  todos.push(todo); // push the new task data in todos state variables

  saveTodos(); //save to local storage
  renderTodos(); // update the UI

  taskInput.value = ""; //clear the input field when adding task

  // console.log(todos);
};

// =======================
// RENDER TODOS ON SCREEN
// =======================
const renderTodos = function () {
  todosList.innerHTML = ""; // clear the list first before rendering

  const filteredTodos = filterTodos(currentFilter); // apply to all filter (all, active, completed)

  filteredTodos.forEach(({ id, text, completed }) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (completed) todoItem.classList.add("completed");

    // CHECKBOX
    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-container");

    const checkBox = document.createElement("input"); // create input type  checkbox
    checkBox.type = "checkbox";
    checkBox.checked = completed; // if checked mark as completed task
    checkBox.classList.add("todo-checkbox"); // add css style class
    checkBox.addEventListener("change", () => toggleTodo(id)); // toggle check and uncheck mark

    const checkmark = document.createElement("span"); // create span element
    checkmark.classList.add("checkmark"); // add css style class

    checkboxContainer.append(checkBox, checkmark); // append checkbox and checkmark to the parent element checkbox container

    //TODO TEXT
    const todoText = document.createElement("span"); // create element span
    todoText.classList.add("todo-item-text"); // add css style class
    todoText.textContent = text; // set todo text when the user fill the input task

    // DELETE BUTTON
    const deleteBtn = document.createElement("button"); //create button element
    deleteBtn.classList.add("delete-btn"); // add css style class
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`; // close icon from front awesome
    deleteBtn.addEventListener("click", () => deleteTodo(id)); // attack event listener to the button when click the task is delete

    // APPEND EVERYTHING INSIDE OF LIST ITEM
    todoItem.append(checkboxContainer, todoText, deleteBtn);
    todosList.appendChild(todoItem);
  });
};

// =======================
// SAVE TODOS TO LOCAL STORAGE
// =======================
const saveTodos = function () {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemsCount();
  checkEmptyState();
};

const filterTodos = function (filter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

// =======================
// TOGGLE A TODO'S COMPLETED STATUS
// =======================
const toggleTodo = function (id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos();
  renderTodos();
};

// =======================
// DELETE A TODO
// =======================
const deleteTodo = function (id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
};

// =======================
// SHOW NUMBER OF TASKS LEFT
// =======================
const updateItemsCount = function () {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  itemsLeft.textContent = `${uncompletedTodos.length} item${
    uncompletedTodos.length !== 1 ? "s" : ""
  } left`;
};

// =======================
// SHOW EMPTY STATE IF LIST IS EMPTY
// =======================
const checkEmptyState = function () {
  const filteredTodos = filterTodos(currentFilter);
  emptyState.classList.toggle("hidden", filteredTodos.length !== 0);
};

// =======================
// CLEAR COMPLETED TODOS
// =======================
const clearCompleted = function () {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
};

// =======================
// LOAD TODOS FROM LOCAL STORAGE
// =======================
const loadTodos = function () {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) todos = JSON.parse(storedTodos);
  renderTodos();
};

// =======================
// SET ACTIVE FILTER (UI + Logic)
// =======================
const setActiveFilter = function (filter) {
  currentFilter = filter;

  filters.forEach((item) => {
    item.classList.toggle("active", item.dataset.filter === filter);
  });

  renderTodos();
};

// Add click listeners to filter buttons
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    console.log(filter.dataset.filter);
    setActiveFilter(filter.dataset.filter);
  });
});

// =======================
// SET DATE
// =======================
const setDate = function () {
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  const today = new Date();

  dateElement.textContent = today.toLocaleDateString("en-Us", options);
};

// ATTACH EVENT LISTENER
addTaskBtn.addEventListener("click", () => addTodo(taskInput.value));

//ADD TASK WHEN PRESSING ENTER
taskInput.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
  if (e.key === "Enter") {
    e.preventDefault(e);
    addTodo(taskInput.value);
  }
});

//CLEAR COMPLETED TODOS
clearCompletedBtn.addEventListener("click", clearCompleted);

//RUN WHEN THE PAGE IS LOAD
window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateItemsCount();
  setDate();
});
