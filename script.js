// All imports
import { getUserIds, getData, setData, clearData } from "./storage.js";

// This function checks the values from the form.
// It also trims extra spaces from the start and end.
export function constructorValidation(url, title, description) {
  const trimmedUrl = url.trim();
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (trimmedUrl === "") {
    throw new Error("URL must be a non-empty string");
  }

  if (trimmedTitle === "") {
    throw new Error("Title must be a non-empty string");
  }

  if (trimmedDescription === "") {
    throw new Error("Description must be a non-empty string");
  }

  return {
    url: trimmedUrl,
    title: trimmedTitle,
    description: trimmedDescription,
  };
}

// This sorts bookmarks so the newest one appears first.
// We export it so the test file can test it.
export function sortBookmarksNewestFirst(bookmarks) {
  return [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);
}

// This adds one like to the clicked bookmark only.
// We export it so the test file can test it.
export function incrementBookmarkLike(bookmarks, bookmarkId) {
  return bookmarks.map((bookmark) => {
    if (bookmark.id !== bookmarkId) {
      return bookmark;
    }

    return {
      ...bookmark,
      likes: bookmark.likes + 1,
    };
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
    this.timestamp = timestamp;
    this.likes = likes;
  }
}

// This block only runs in the browser.
// It does not run during tests because Node does not have document.
if (typeof document !== "undefined") {
  const userSelect = document.getElementById("user-select");
  const bookmarkForm = document.getElementById("bookmark-form");
  const bookmarkList = document.getElementById("bookmark-list");
  const deleteData = document.getElementById("delete-data");

  userSelect.addEventListener("change", renderData);
  bookmarkForm.addEventListener("submit", formSubmission);

  if (deleteData) {
    deleteData.addEventListener("click", clearUserData);
  }

  // Run when the page loads
  function init() {
    createOptions();
    renderData();
  }

  // Create the dropdown options from the user IDs
  function createOptions() {
    const users = getUserIds();

    users.forEach((id) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = `User: ${id}`;
      userSelect.appendChild(option);
    });
  }

  // This runs when the form is submitted
  function formSubmission(e) {
    e.preventDefault();

    const userID = userSelect.value;
    const currentData = getData(userID) || [];
    const currentDate = Date.now();
    const url = document.getElementById("bookmark-url").value;
    const title = document.getElementById("bookmark-title").value;
    const description = document.getElementById("bookmark-description").value;

    try {
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
    } catch (error) {
      alert(error.message);
    }
  }

  // Show bookmarks for the selected user
  function renderData() {
    const selectedUser = userSelect.value;
    const bookmarks = sortBookmarksNewestFirst(getData(selectedUser) || []);

    bookmarkList.innerHTML = "";

    if (bookmarks.length === 0) {
      bookmarkList.innerHTML = "<p>No bookmarks found for this user.</p>";
      return;
    }

    bookmarks.forEach((bookmark) => {
      createBookmarkContent(bookmark, selectedUser);
    });
  }

  // Create the HTML for one bookmark
  function createBookmarkContent(bookmark, selectedUser) {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
      <p>${bookmark.description}</p>
      <small>Saved on: ${new Date(bookmark.timestamp).toLocaleString()}</small>
    `;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy to clipboard";
    copyBtn.setAttribute("aria-label", `Copy URL for ${bookmark.title}`);
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });

    const likeBtn = document.createElement("button");
    likeBtn.textContent = `Likes: ${bookmark.likes}`;
    likeBtn.setAttribute(
      "aria-label",
      `Like ${bookmark.title}, currently ${bookmark.likes} likes`,
    );

    likeBtn.addEventListener("click", () => {
      const allBookmarks = getData(selectedUser) || [];
      const updatedBookmarks = incrementBookmarkLike(allBookmarks, bookmark.id);

      setData(selectedUser, updatedBookmarks);
      renderData();
    });

    div.appendChild(copyBtn);
    div.appendChild(likeBtn);
    bookmarkList.appendChild(div);
  }

  // Clear data for the selected user
  // This is only for development/testing.
  function clearUserData() {
    const userID = userSelect.value;
    clearData(userID);
    renderData();
  }

  init();
}