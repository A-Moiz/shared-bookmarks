# Shared Bookmark Testing

## Rubric testing checklist

### The website must contain a drop-down which lists five users

This was achieved by appending each option with it's respective user number to the select tag from JS. This was tested by observing the live website and checking if there were 5 users as options in the drop-down.

---

### Selecting a user must display the list of bookmarks for the relevant user

Each bookmark is saved and fetched via local storage using the user's number as a key and returns bookmarks if present. This was tested by switching between users using the drop-down and checking if the bookmarks being displayed change with it.

---

### If there are no bookmarks for the selected user, a message is displayed to explain this

This is achieve by checking the length of bookmarks and if it is 0 that implies it is empty or that there are no bookmarks saved for that user. If this is the case a message `(p tag)` is inserted into HTML. This was tested by selecting a user from the drop-down that has no bookmarks saved or clearing all bookmarks for a user.

---

### The list of bookmarks must be shown in reverse chronological order

This was achieved by using the timestamps of each bookmark and sorting them accordingly and displaying the newest bookmarks on top. This was tested by adding multiple bookmarks to one user and checking if each new bookmark appears on top.

---

### Each bookmark has a title, description and created at timestamp displayed

This was achieved by creating a Bookmark class with these fields and using the object to display it's content into HTML. This was tested visually by checking if each bookmark has a title, description and creation date.

---

### Each bookmark’s title is a link to the bookmark’s URL

This was achieved by embedding each bookmark title with a link `(a tag)`. This was tested by clicking on each bookmark title and checking if it opened the correct page.

---

### Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

This was achieved by using `clipboard` from JavaScript's `navigator` object to write text to it, which essentially saves the bookmark url to the user's clipboard. This was tested by checking clipboard history before and after clicking the button to see if the link was copied.

---

### Each bookmark's like counter works independently, and persists data across sessions

This was achieved by finding each bookmark via id and updating it's like counter and saving it back to local storage. This was tested by manually refreshing the page and checking if the like counter for a bookmark persisted.

---

### The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

This was achieved by adding a form within `index.html` with the relevant fields. This was tested by visually checking the website to see if the form fields were present.

---

### Submitting the form adds a new bookmark for the relevant user only

This was achieved by using the currently selected user as a key in local storage to assign the new bookmark with it's details from the form and calling the render function again to update the page. This was tested by adding multiple bookmarks to each user and checking if they were assigned correctly.

---

### After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

This is achieved by pushing the new bookmark to the user's bookmarks array and rendering the data again. This was tested by adding multiple bookmarks and checking if they were being added/displayed correctly for the current user.

---

### The website must score 100 for accessibility in Lighthouse

I tested this manually using Lighthouse in Chrome dev tools.

---

### Unit tests must be written for at least one non-trivial function

Unit tests in `example.test.js`
