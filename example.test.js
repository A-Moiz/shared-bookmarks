import assert from "node:assert";
import test from "node:test";
import { getUserIds, getData } from "./storage.js";
import { constructorValidation } from "./script.js";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

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

test("Gives an alert when URL is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("", "title", "description");
  assert.strictEqual(alertCalled, true);
});

test("Gives an alert when Title is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("https://google.com", "", "description");
  assert.strictEqual(alertCalled, true);
});

test("Gives an alert when Description is empty", () => {
  let alertCalled = false;
  global.alert = () => {
    alertCalled = true;
  };

  constructorValidation("https://google.com", "title", "");
  assert.strictEqual(alertCalled, true);
});
