# 🌍 Around The U.S. – Interactive Travel Cards

## 📌 Project Description

**"Around The U.S."** is an interactive web application that allows users to explore locations, add new travel cards, and manage profile information dynamically.

Users can:

- View location cards with images and names.
- Like individual cards by clicking the "like" button.
- Delete cards from the feed.
- Add new cards via a modal form.
- View an enlarged version of each card image in a popup.
- Edit profile information (name and description).
- See real-time validation messages when filling out forms.

---

## 🧩 Main Features

- Profile edit modal with auto-filled existing data.
- Modal to add new travel cards dynamically.
- Image preview modal with caption for each card.
- Like button on each card that toggles its appearance.
- Delete button to remove cards from the DOM.
- Dynamic DOM updates when adding, liking, or deleting cards.
- Initial cards loaded from the `initialCards` array.
- Form validation with custom error messages and disabled submit button when invalid.
- Automatic reset of form state and errors when closing modals.

---

## 🗂️ Project Architecture

The project follows a **modular JavaScript architecture** with a clear separation of responsibilities:

- **`index.js`**  
  Handles page-specific logic, DOM initialization, event binding, and class instantiation.

- **`components/Card.js`**  
  Defines the `Card` class responsible for creating, rendering, and managing individual card behavior (like, delete, and image click).

- **`utils/utils.js`**  
  Contains reusable utility functions for opening and closing modals, handling the Escape key, and detecting overlay clicks.

This structure improves code readability, maintainability, and scalability.

---

## 🛠️ Technologies Used

- **HTML5** → Semantic structure and template usage for cards.
- **CSS3** → Styling for cards, modals, validation states, and modular layout.
- **JavaScript (ES6 Modules)** → Class-based components, modular utilities, DOM manipulation, modal handling, and form validation.

---

## ♻️ Data Flow Overview

1. The page loads initial cards from the `initialCards` array.
2. Users can interact with each card: like, delete, or view the enlarged image.
3. When a new card is added via the form, it is inserted at the top of the card list using `prepend()`.
4. Forms validate inputs in real time, while modal behavior is handled through reusable utility functions.
5. After successful submission, the modal closes and resets all fields and error states.

---

## 🔧 Future Improvements

- 💾 Persist data using **LocalStorage** or a backend API.
- 📱 Improve responsiveness for mobile devices.
- 📊 Add filtering or categorization for cards.
- 🌓 Implement light/dark mode toggle.
- 🔐 Optional login for multiple users and personalized profiles.
