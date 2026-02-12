# 🌍 Around The U.S. – Interactive Travel Cards

## 📌 Project Description

**Around The U.S.** is an interactive web application that allows users to explore travel locations, manage profile information, and dynamically add new cards with images and titles.

The project focuses on **modular JavaScript architecture**, clean separation of responsibilities, and real-time form validation using native HTML5 validation APIs.

---

## ✨ Features

Users can:

- 📸 View location cards with image and title.
- ❤️ Like and unlike individual cards.
- 🗑️ Delete cards from the list.
- ➕ Add new travel cards via a popup form.
- 🔍 View an enlarged version of each image in a popup.
- 👤 Edit profile name and description.
- ⚠️ See real-time form validation messages.
- 🚫 Submit buttons are automatically disabled when forms are invalid.
- 🔄 Validation errors persist correctly until resolved.

---

## 🧩 Main Functionalities

- **Profile Edit Popup**
  - Opens with current user data pre-filled.
  - Updates profile information on submit.

- **Add New Card Popup**
  - Allows users to add a new location with title and image URL.
  - New cards are rendered dynamically in the card list.

- **Image Preview Popup**
  - Displays the clicked card image in full size with caption.

- **Form Validation**
  - Implemented via a reusable `FormValidator` class.
  - Uses native browser validation (`validity`, `validationMessage`).
  - Displays error messages under each input field.
  - Automatically disables submit buttons when inputs are invalid.

---

## 🗂️ Project Architecture

The project follows a **class-based, modular structure**:

### 📄 `index.js`

- Entry point of the application.
- Responsible for:
  - Instantiating classes.
  - Connecting components together.
  - Handling page-level logic and event listeners.
  - Creating cards via the `createCard` factory function.

### 📁 `components/`

- **`Card.js`**
  - Handles rendering of a single card.
  - Manages like, delete, and image click interactions.

- **`Section.js`**
  - Responsible for rendering lists of items (cards).
  - Abstracts logic for adding items to the DOM.

- **`Popup.js`**
  - Base popup class with open/close logic.

- **`PopupWithForm.js`**
  - Extends `Popup`.
  - Handles form submission and data extraction.

- **`PopupWithImage.js`**
  - Extends `Popup`.
  - Displays images and captions in a modal.

- **`UserInfo.js`**
  - Manages user profile data (name and description).

- **`FormValidator.js`**
  - Encapsulates all form validation logic.
  - Controls error messages, input error states, and submit button activation.

### 📁 `utils/`

- **`constants.js`**
  - Stores configuration and static data:
    - Initial cards array.
    - Validation configuration object.

This architecture improves **readability, maintainability, and scalability**, while keeping responsibilities clearly separated.

---

## 🔁 Data Flow Overview

1. Initial cards are loaded from the `initialCards` array.
2. Cards are rendered using the `Section` class.
3. Each card instance handles its own interactions.
4. Forms are validated in real time using `FormValidator`.
5. On successful submission:
   - Data is processed.
   - The DOM is updated dynamically.
   - The popup is closed.

---

## 🛠️ Technologies Used

- **HTML5**
  - Semantic structure.
  - `<template>` usage for card markup.
  - Native form validation attributes.

- **CSS3**
  - Responsive layout.
  - Popup styling.
  - Validation and error states.

- **JavaScript (ES6 Modules)**
  - Classes and inheritance.
  - Modular file structure.
  - DOM manipulation.
  - Event handling.

---

## 🚀 Future Improvements

- 💾 Persist cards and profile data using **LocalStorage** or a backend API.
- 📱 Improve mobile responsiveness.
- 🔎 Add card filtering or search functionality.
- 🌓 Implement light/dark mode.
- 🔐 Add authentication for multiple users.
- ♻️ Reset validation state automatically on popup close.
