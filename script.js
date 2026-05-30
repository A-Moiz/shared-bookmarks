// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData, clearData } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
};

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
