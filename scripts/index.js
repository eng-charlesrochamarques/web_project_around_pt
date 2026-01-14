/* =====================
   DADOS INICIAIS
===================== */

let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/* =====================
   SELETORES
===================== */

const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

const editModal = document.querySelector("#edit-popup");
const newModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");

const closeEditButton = editModal.querySelector(".popup__close");
const closeNewCardButton = newModal.querySelector(".popup__close");
const closeImageButton = imageModal.querySelector(".popup__close");

const editForm = editModal.querySelector(".popup__form");
const newCardForm = newModal.querySelector(".popup__form");

const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutInput = editForm.querySelector(".popup__input_type_description");

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const urlInput = newCardForm.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const imageElement = imageModal.querySelector(".popup__image");
const captionElement = imageModal.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/* =====================
   MODAIS
===================== */

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function clearFormErrors(form) {
  const errors = form.querySelectorAll(".popup__form__input-error");
  const inputs = form.querySelectorAll(".popup__input");

  errors.forEach((e) => {
    e.textContent = "";
    e.classList.remove("popup__form__input-error-message_active");
  });

  inputs.forEach((i) => {
    i.classList.remove("popup__form__input-error-message");
  });
}

function closeModalWithReset(modal) {
  const form = modal.querySelector("form");
  if (form) {
    form.reset();
    clearFormErrors(form);
  }
  closeModal(modal);
}

/* =====================
   PERFIL
===================== */

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  const inputs = editForm.querySelectorAll(".popup__input");
  const button = editForm.querySelector(".popup__button");
  toggleButtonState(inputs, button);
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!editForm.reportValidity()) return;

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closeModal(editModal);
}

/* =====================
   CARDS
===================== */

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function removeCard(evt) {
  evt.target.closest(".card").remove();
}

function openImageModal(name, link) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openModal(imageModal);
}

function getCardElement(name, link) {
  const card = cardTemplate.cloneNode(true);
  const title = card.querySelector(".card__title");
  const img = card.querySelector(".card__image");

  title.textContent = name;
  img.src = link;
  img.alt = name;

  card
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeButton);
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);
  img.addEventListener("click", () => openImageModal(name, link));

  return card;
}

function renderCard(name, link) {
  cardsContainer.prepend(getCardElement(name, link));
}

/* =====================
   FORM NEW CARD
===================== */

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const url = urlInput.value;

  initialCards.unshift({ name, link: url });
  renderCard(name, url);

  newCardForm.reset();
  closeModal(newModal);
}

/* =====================
   VALIDAÇÃO
===================== */

function hasInvalidInput(inputs) {
  return Array.from(inputs).some((i) => !i.validity.valid);
}

function toggleButtonState(inputs, button) {
  button.disabled = hasInvalidInput(inputs);
}

function showInputError(form, input, message) {
  const error = form.querySelector(`.${input.name}-input-error`);
  input.classList.add("popup__form__input-error-message");
  error.textContent = message;
  error.classList.add("popup__form__input-error-message_active");
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.name}-input-error`);
  input.classList.remove("popup__form__input-error-message");
  error.textContent = "";
  error.classList.remove("popup__form__input-error-message_active");
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function enableValidation(formSelector) {
  const form = document.querySelector(formSelector);
  const inputs = form.querySelectorAll(".popup__input");
  const button = form.querySelector(".popup__button");

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
}

/* =====================
   INICIALIZAÇÃO
===================== */

initialCards.forEach((c) => renderCard(c.name, c.link));

enableValidation("#edit-profile-form");
enableValidation("#new-card-form");

/* =====================
   EVENTOS
===================== */

editButton.addEventListener("click", handleOpenEditModal);
newCardButton.addEventListener("click", () => openModal(newModal));

closeEditButton.addEventListener("click", () => closeModalWithReset(editModal));
closeNewCardButton.addEventListener("click", () =>
  closeModalWithReset(newModal)
);
closeImageButton.addEventListener("click", () =>
  closeModalWithReset(imageModal)
);

editForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closeModalWithReset(popup);
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".popup.popup_is-opened");
    if (opened) closeModalWithReset(opened);
  }
});
