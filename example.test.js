import assert from "node:assert";
import test from "node:test";
import {
  constructorValidation,
  sortBookmarksNewestFirst,
  incrementBookmarkLike,
} from "./script.js";

// Checks that the form values are cleaned up before saving.
test("Trims whitespace from all fields", () => {
  const result = constructorValidation(
    " https://google.com ",
    " title ",
    " description ",
  );

  assert.strictEqual(result.url, "https://google.com");
  assert.strictEqual(result.title, "title");
  assert.strictEqual(result.description, "description");
});

// Checks that a bookmark cannot be created without a URL.
test("Throws an error when URL is empty", () => {
  assert.throws(
    () => constructorValidation("", "title", "description"),
    /URL must be a non-empty string/,
  );
});

// Checks that a bookmark cannot be created without a title.
test("Throws an error when title is empty", () => {
  assert.throws(
    () => constructorValidation("https://google.com", "", "description"),
    /Title must be a non-empty string/,
  );
});

// Checks that a bookmark cannot be created without a description.
test("Throws an error when description is empty", () => {
  assert.throws(
    () => constructorValidation("https://google.com", "title", ""),
    /Description must be a non-empty string/,
  );
});

// Checks that bookmarks are shown with the newest bookmark first.
test("Sorts bookmarks in reverse chronological order", () => {
  const bookmarks = [
    {
      id: 1,
      title: "Old bookmark",
      timestamp: 1000,
      likes: 0,
    },
    {
      id: 2,
      title: "Newest bookmark",
      timestamp: 3000,
      likes: 0,
    },
    {
      id: 3,
      title: "Middle bookmark",
      timestamp: 2000,
      likes: 0,
    },
  ];

  const result = sortBookmarksNewestFirst(bookmarks);

  assert.deepStrictEqual(
    result.map((bookmark) => bookmark.id),
    [2, 3, 1],
  );
});

// Checks that clicking like only updates the chosen bookmark.
test("Increments likes for only the selected bookmark", () => {
  const bookmarks = [
    {
      id: 1,
      title: "First bookmark",
      likes: 0,
    },
    {
      id: 2,
      title: "Second bookmark",
      likes: 4,
    },
  ];

  const result = incrementBookmarkLike(bookmarks, 2);

  assert.strictEqual(result[0].likes, 0);
  assert.strictEqual(result[1].likes, 5);
});
