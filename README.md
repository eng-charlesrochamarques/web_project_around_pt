# 🌍 Around The U.S. – Interactive Travel Cards

## 📌 Project Description

"Around The U.S." is an interactive web application that allows users to explore locations, add new travel cards, and manage profile information dynamically.

Users can:

- View location cards with images and names.
- Like individual cards by clicking the "like" button.
- Delete cards from the feed.
- Add new cards via a modal form.
- View an enlarged version of each card image in a popup.
- Edit profile information (name and description).

## 🧩 Main Features

- Profile edit modal with auto-filled existing data.
- Modal to add new travel cards dynamically.
- Image preview modal with caption for each card.
- Like button on each card that toggles its appearance.
- Delete button to remove cards from the DOM.
- Dynamic DOM updates when adding, liking, or deleting cards.
- Initial cards loaded from the `initialCards` array.

## 🛠️ Technologies Used

- **HTML5** → Semantic structure and template usage for cards.
- **CSS3** → Styling for cards, modals, and modular layout.
- **JavaScript** → DOM manipulation, form handling, and interactive card logic.

## ♻️ Data Flow Overview

1. The page loads initial cards from the `initialCards` array.
2. Users can interact with each card: like, delete, or view enlarged image.
3. When a new card is added via the form, it is inserted at the top of the card list (`prepend`).
4. Profile and new card forms update the DOM and close the modal after submission.

## 🔧 Future Improvements

- 💾 Save data locally using LocalStorage to persist added cards.
- 📱 Improve responsiveness for mobile devices.
- 📊 Add filtering or categorization for cards.
- 🌓 Implement light/dark mode toggle.
- 🔐 Optional login for multiple users and personalized profiles.
