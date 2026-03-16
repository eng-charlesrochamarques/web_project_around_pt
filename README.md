# 🌍 Around The U.S. – Interactive Travel Cards

## 📌 Project Description

**Around The U.S.** is an interactive web application that allows users to explore travel locations, manage profile information, and dynamically create and manage travel cards.

The project focuses on **modular JavaScript architecture**, **object-oriented programming**, and **API integration** to manage user data and cards dynamically.

Users can update their profile, upload a profile avatar, create new location cards, like/unlike cards, and delete cards through confirmation dialogs. All interactions are synchronized with a backend API.

---

# ✨ Features

Users can:

- 📸 View travel cards with image and title.
- ❤️ Like and unlike cards.
- 🗑️ Delete cards with a confirmation popup.
- ➕ Add new travel cards dynamically.
- 🔍 Open a full-size image preview in a popup.
- 👤 Edit profile name and description.
- 🖼️ Update profile avatar via image URL.
- ⚠️ See real-time form validation messages.
- 🚫 Submit buttons automatically disable when forms are invalid.
- ⏳ See loading states while requests are processed (`Saving...`, `Creating...`, `Deleting...`).
- 🔄 Data is loaded dynamically from a backend API.

---

# 🧩 Main Functionalities

## 👤 Profile Editing

- Opens a popup with the current user data pre-filled.
- Allows updating **name** and **description**.
- Updates user data via API request.
- Displays a **loading indicator ("Saving...")** while the request is processed.

---

## 🖼️ Avatar Editing

- Users can update their **profile image** via URL.
- The avatar updates instantly after the API response.
- Loading state is displayed while uploading.

---

## ➕ Add New Card

- Users can create a new travel card with:
  - Title
  - Image URL
- The card is added dynamically to the card list.
- Shows **"Creating..."** while the card is being added.

---

## ❤️ Like / Unlike Cards

- Users can like or unlike cards.
- Likes are synchronized with the API.
- Like count updates instantly after the response.

---

## 🗑️ Delete Cards

- Cards can be deleted through a **confirmation popup**.
- Only the owner of the card can see the delete button.
- The button displays **"Deleting..."** during the API request.

---

## 🔍 Image Preview Popup

- Clicking a card image opens a **fullscreen preview popup**.
- Displays the image with its caption.

---

# 🗂️ Project Architecture

The project follows a **modular, class-based architecture**, where each class handles a specific responsibility.

---

# 📄 `index.js`

The main entry point of the application.

Responsible for:

- Initializing the application
- Creating instances of all classes
- Connecting components together
- Handling API interactions
- Rendering cards received from the server

---

# 📁 `components/`

## `Card.js`

Responsible for:

- Rendering individual cards
- Handling card interactions:
  - Like / Unlike
  - Delete
  - Image preview
- Managing card ownership and permissions

---

## `Section.js`

Handles rendering of multiple items.

Responsibilities:

- Rendering card lists
- Adding new items to the DOM dynamically

---

## `Popup.js`

Base popup class that provides:

- Opening popup
- Closing popup
- Overlay click handling
- ESC key closing behavior

All other popups inherit from this class.

---

## `PopupWithForm.js`

Extends `Popup`.

Handles:

- Form submission
- Extracting form input values
- Resetting form on close
- Loading state management (`renderLoading()`)

Used for:

- Edit Profile
- Add Card
- Edit Avatar

---

## `PopupWithImage.js`

Extends `Popup`.

Handles:

- Displaying card images in a modal
- Rendering caption and image source dynamically

---

## `PopupWithConfirmation.js`

Extends `Popup`.

Handles:

- Card deletion confirmation
- Passing card ID and element for deletion
- Showing loading state during API deletion request

---

## `UserInfo.js`

Manages user profile data:

- User name
- User description
- User avatar

Provides methods to update UI after API responses.

---

## `FormValidator.js`

Encapsulates form validation logic.

Features:

- Real-time validation
- Error message display
- Submit button activation/deactivation
- Input error styling

Uses native HTML5 validation APIs such as:

- `validity`
- `validationMessage`

---

# 📁 `utils/`

## `constants.js`

Stores configuration values such as:

- Validation settings
- Input selectors
- Error classes

Separating constants improves maintainability.

---

# 🔁 Data Flow Overview

1️⃣ The application loads **user data and cards from the API**.

2️⃣ `Section` renders cards using the `createCard()` factory function.

3️⃣ Each `Card` instance manages its own interactions.

4️⃣ Forms are validated in real time using `FormValidator`.

5️⃣ When a form is submitted:

- The corresponding API request is sent.
- The UI shows a loading state.
- The response updates the DOM dynamically.
- The popup closes automatically.

---

# 🌐 API Integration

The application uses a REST API to manage:

- User profile data
- Avatar updates
- Cards
- Likes
- Card deletion

All UI updates occur **after successful API responses** to ensure consistency between the client and server.

---

# 🛠️ Technologies Used

## HTML5

- Semantic structure
- `<template>` for card generation
- Native form validation attributes

---

## CSS3

- Responsive layout
- Popup styling
- Validation states
- Modern UI design

---

## JavaScript (ES6 Modules)

- Classes and inheritance
- Modular architecture
- DOM manipulation
- Event-driven interactions
- API requests using `fetch`

---

# 🚀 Possible Future Improvements

- 💾 Implement persistent sessions and authentication.
- 📱 Improve mobile responsiveness and accessibility.
- 🔎 Add search and filtering for cards.
- 🌓 Add light/dark theme toggle.
- 📊 Add animation and micro-interactions.
- 🗃️ Add card editing functionality.
- 🧪 Implement automated testing.

---

# 👨‍💻 Author

Developed by **Charles Rocha Marques** as part of a JavaScript architecture and frontend development project.
