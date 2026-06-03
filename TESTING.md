# Testing

## Rubric testing checklist

### The website contains a drop-down which lists five users

The user can choose a user from the dropdown list at the top of the page. I tested this manually by opening the website and checking that the dropdown shows users 1, 2, 3, 4, and 5.

### Selecting a user displays the list of bookmarks for the relevant user

The user selects a user from the dropdown to see the bookmarks saved for that user. I tested this by selecting different users and checking that the bookmarks shown changed depending on the selected user.

### If there are no bookmarks for the selected user, a message is displayed

When a user has no saved bookmarks, the page shows a message saying there are no bookmarks for that user. I tested this by selecting a user with no saved bookmarks and checking that the empty message appeared.

### The list of bookmarks is shown in reverse chronological order

When bookmarks are displayed, the newest bookmark should appear first. I tested this by adding more than one bookmark for the same user and checking that the newest bookmark appeared at the top of the list.

### Each bookmark has a title, description and created at timestamp displayed

After a bookmark is saved, the page shows the bookmark title, description, and the date and time it was created. I tested this manually by creating a bookmark and checking that all three pieces of information were displayed.

### Each bookmark’s title is a link to the bookmark’s URL

The user can click the bookmark title to open the saved URL. I tested this manually by creating a bookmark and checking that the title was clickable and opened the correct link.

### Each bookmark's "Copy to clipboard" button copies the URL

The user can click the "Copy to clipboard" button on a bookmark to copy its URL. I tested this by clicking the button and pasting the copied URL into a text field.

### Each bookmark's like counter works independently, and persists data across sessions

The user can click the like button on each bookmark, and only that bookmark's like count should increase. I tested this manually by creating more than one bookmark, liking only one of them, refreshing the page, and checking that only that bookmark's like count stayed updated.

### The website contains a form with inputs for a URL, a title, and a description

The user can add a new bookmark using the form with URL, title, and description fields. I tested this by checking that the form had labelled inputs for URL, title, and description, plus a submit button.

### Submitting the form adds a new bookmark for the relevant user only

The user adds a bookmark while one user is selected, and the bookmark should only be saved for that selected user. I tested this by adding a bookmark for one user, switching to another user, and checking that the bookmark did not appear there.

### After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

After the form is submitted, the bookmark list updates straight away for the selected user. I tested this by submitting the form and checking that the new bookmark appeared immediately in the list.

### The website scores 100 for accessibility in Lighthouse

The website should be accessible in every view, including when a user has bookmarks and when a user has no bookmarks. I tested this manually using Lighthouse Snapshot mode.

### Unit tests are written for at least one non-trivial function

The project includes unit tests in `example.test.js`. I tested this by running `npm test`, which checks that form values are trimmed and that validation handles empty URL, title, and description fields.

## Running tests

Run:

```bash
npm i
npm test