// Imports
import assert from "node:assert";
import test from "node:test";
import { getUserIds, getData } from "./storage.js";
import { constructorValidation } from "./script.js";

// Example test
test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

// Checking if whitespaces from fields are removed
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

// Checking if alert is present if url is missing
test("Gives an alert when URL is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("", "title", "description");
  assert.strictEqual(alertCalled, true);
});

// Checking if alert is present if title is missing
test("Gives an alert when Title is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("https://google.com", "", "description");
  assert.strictEqual(alertCalled, true);
});

// Checking if alert is present if description is missing
test("Gives an alert when Description is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("https://google.com", "title", "");
  assert.strictEqual(alertCalled, true);
});
