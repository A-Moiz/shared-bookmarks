# Testing

## Rubric testing checklist

### The website contains a drop-down which lists five users

Tested manually by opening the website and checking that the dropdown contains users 1, 2, 3, 4, and 5.

### Selecting a user displays the list of bookmarks for the relevant user

Tested manually by selecting different users and checking that each user shows their own bookmarks only.

### If there are no bookmarks for the selected user, a message is displayed

Tested manually by selecting a user with no saved bookmarks and checking that the page displays “No bookmarks found for this user.”

### The list of bookmarks is shown in reverse chronological order

Tested manually by adding more than one bookmark for the same user and checking that the newest bookmark appears at the top of the list.

### Each bookmark has a title, description and created at timestamp displayed

Tested manually by creating a bookmark and checking that the title, description, and saved date are displayed.

### Each bookmark’s title is a link to the bookmark’s URL

Tested manually by creating a bookmark and checking that the title is clickable and opens the saved URL.

### Each bookmark's "Copy to clipboard" button copies the URL

Tested manually by clicking the copy button and pasting the copied URL into a text field.

### Each bookmark's like counter works independently, and persists data across sessions

Tested manually by creating more than one bookmark, clicking like on only one of them, refreshing the page, and checking that only that bookmark's like count stayed updated.

### The website contains a form with inputs for a URL, a title, and a description

Tested manually by checking that the form has labelled URL, title, and description fields, plus a submit button.

### Submitting the form adds a new bookmark for the relevant user only

Tested manually by adding a bookmark for one user, switching users, and checking that the bookmark only appears for the original user.

### After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

Tested manually by submitting the form and checking that the new bookmark appears immediately.

### The website scores 100 for accessibility in Lighthouse

Tested manually using Lighthouse Snapshot mode.

### Unit tests are written for at least one non-trivial function

Tested with unit tests in `example.test.js`. The tests check that form values are trimmed and that validation handles empty URL, title, and description fields.

## Running tests

Run:

```bash
npm i
npm test