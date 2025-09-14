const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");

document.addEventListener("DOMContentLoaded", loadBookmarks);

// addBookmarkBtn.addEventListener("click", function () {
//   const name = bookmarkNameInput.value.trim();
//   const url = bookmarkUrlInput.value.trim();

//   if (!name || !url) {
//     alert("Please enter both name and URL.");
//     return;
//   } else {
//     if (!url.startsWith("http://") && !url.startsWith("https://")) {
//       alert("Please enter a valid URL starting with http:// or https://");
//       return;
//     }

//     addBookmark(name, url);
//     saveBookmark(name, url);
//     bookmarkNameInput.value = "";
//     bookmarkUrlInput.value = "";
//   }
// });

// function addBookmark(name, url) {
//   const li = document.createElement("li");
//   const link = document.createElement("a");

//   link.href = url;
//   link.textContent = name;
//   link.target = "_blank";

//   const removeButton = document.createElement("button");
//   removeButton.textContent = "Remove";
//   removeButton.addEventListener("click", function () {
//     bookmarkList.removeChild(li);
//     removeBookmarkFromStorage(name, url);
//   });

//   li.appendChild(link);
//   li.appendChild(removeButton);

//   bookmarkList.appendChild(li);
// }

// function getBookmarksFromStorage() {
//   const bookmarks = localStorage.getItem("bookmarks");
//   return bookmarks ? JSON.parse(bookmarks) : [];
// }

// function saveBookmark(name, url) {
//   const bookmarks = getBookmarksFromStorage();
//   bookmarks.push({ name, url });
//   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
// }

// //TODO
// function loadBookmarks() {
//   const bookmarks = getBookmarksFromStorage();
//   bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
// }

// function removeBookmarkFromStorage(name, url) {
//   let bookmarks = getBookmarksFromStorage();
//   bookmarks = bookmarks.filter(
//     (bookmark) => bookmark.name !== name || bookmark.url !== url
//   );
//   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
// }

// document.addEventListener("DomContentLoaded", loadBookmark);

function handleBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  console.log(name);

  //if input is empty
  if (!name || !url) {
    alert("The input must not be empty");
    return;
  }

  //if url start with https:// or http://
  if (!url.startsWith("htpp://") && !url.startsWith("https://")) {
    alert("http and https must be required in this input");
    return;
  }

  //display to UI and save to local storage
  addBookmark(name, url);
  saveBookmark(name, url);

  //clear inputs
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

//create and displaying bookmark
function addBookmark(name, url) {
  //create li element
  const li = document.createElement("li");

  //create link element
  const link = document.createElement("a");
  link.textContent = name;
  link.href = url;
  link.target = "_blank";

  //create remove button element
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li); //remove from UI
    removeBookmarkFromStorage(name, url); // removebookmark from local storage
  });

  // add link and remove buttom from list item
  li.appendChild(link);
  li.appendChild(removeButton);

  // add list item to bookmark list
  bookmarkList.appendChild(li);
}

function getBookmarkFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
  const bookmarks = getBookmarkFromStorage();
  bookmarks.push({ name, url });
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
}

function loadBookmarks(name, url) {
  const bookmarks = getBookmarkFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url) {
  let bookmarks = getBookmarkFromStorage();

  bookmarks = bookmarks.filter(
    (bookmark) => !bookmark.name !== name || !bookmark.url !== url
  );

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

addBookmarkBtn.addEventListener("click", handleBookmark);
