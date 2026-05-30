// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkList = document.getElementById("bookmark-list");
const deleteData = document.getElementById("delete-data");

userSelect.addEventListener("change", renderData);
bookmarkForm.addEventListener("submit", formSubmission);
deleteData.addEventListener("click", clearUserData);

// Run on launch
function init() {
  createOptions();
  renderData();
}

// Create options out of User IDs
function createOptions() {
  const users = getUserIds();
  users.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User: ${id}`;
    userSelect.appendChild(option);
  });
}

// Class for Bookmark object
class Bookmark {
  constructor(id, url, title, description, timestamp, likes) {
    const validParams = constructorValidation(url, title, description);

    this.id = id;
    this.url = validParams.url;
    this.title = validParams.title;
    this.description = validParams.description;
    this.timestamp = validParams.timestamp;
    this.likes = likes;
  }
}

// Validating constructor arguments
function constructorValidation(url, title, description) {
  if (typeof url !== "string" || url.trim() === "") {
    alert("URL must be a non-empty string");
  }

  if (typeof title !== "string" || title.trim() === "") {
    alert("Title must be a non-empty string");
  }

  if (typeof description !== "string" || description.trim() === "") {
    alert("Description must be a non-empty string");
  }

  return {
    url: url.trim(),
    title: title.trim(),
    description: description.trim(),
  };
}

// Handling form submission
function formSubmission(e) {
  e.preventDefault();

  const userID = userSelect.value;
  const currentData = getData(userID) || [];
  const currentDate = Date.now();
  const url = document.getElementById("bookmark-url").value;
  const title = document.getElementById("bookmark-title").value;
  const description = document.getElementById("bookmark-description").value;

  const newBookmark = new Bookmark(
    currentDate,
    url,
    title,
    description,
    currentDate,
    0,
  );

  currentData.push(newBookmark);
  setData(userID, currentData);
  renderData();
  bookmarkForm.reset();
}

// Rendering bookmarks
function renderData() {
  const selectedUser = userSelect.value;
  const bookmarks = (getData(selectedUser) || []).sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarkList.innerHTML = "<p>No bookmarks found for this user.</p>";
    return;
  }

  bookmarks.forEach((bookmark) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
      <p>${bookmark.description}</p>
      <small>Saved on: ${new Date(bookmark.timestamp).toLocaleString()}</small>
    `;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy to clipboard";
    copyBtn.setAttribute("aria-label", `Copy URL for ${bookmark.title}`);
    copyBtn.addEventListener("click", () =>
      navigator.clipboard.writeText(bookmark.url),
    );

    const likeBtn = document.createElement("button");
    likeBtn.textContent = `Likes: ${bookmark.likes}`;
    likeBtn.setAttribute(
      "aria-label",
      `Like ${bookmark.title}, currently ${bookmark.likes} likes`,
    );
    likeBtn.addEventListener("click", () => {
      const allBookmarks = getData(selectedUser);
      const target = allBookmarks.find((b) => b.id === bookmark.id);
      target.likes += 1;
      setData(selectedUser, allBookmarks);
      renderData();
    });

    div.appendChild(copyBtn);
    div.appendChild(likeBtn);
    bookmarkList.appendChild(div);
  });
}

// Delete all data
function clearUserData() {
  const userID = userSelect.value;
  clearData(userID);
  renderData();
}

// Initialize the app
init();
