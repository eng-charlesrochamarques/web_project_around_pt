import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

/* =====================
   DADOS INICIAIS
===================== */

const initialCards = [
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

// Botões
const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

// Popups
const editModal = document.querySelector("#edit-popup");
const newCardModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");

// Botões fechar
const closeEditButton = editModal.querySelector(".popup__close");
const closeNewCardButton = newCardModal.querySelector(".popup__close");
const closeImageButton = imageModal.querySelector(".popup__close");

// Forms
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

// Inputs perfil
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutInput = editForm.querySelector(".popup__input_type_description");

// Inputs card
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const urlInput = newCardForm.querySelector(".popup__input_type_url");

// Perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Cards
const cardsContainer = document.querySelector(".cards__list");

// Imagem popup
const imageElement = imageModal.querySelector(".popup__image");
const captionElement = imageModal.querySelector(".popup__caption");

/* =====================
   FUNÇÕES DE MODAL
===================== */

function clearFormErrors(form) {
  const errors = form.querySelectorAll(".popup__input-error");
  const inputs = form.querySelectorAll(".popup__input");

  errors.forEach((error) => {
    error.textContent = "";
    error.classList.remove("popup__input-error-message_active");
  });

  inputs.forEach((input) => {
    input.classList.remove("popup__input-error-message");
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
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closeModal(editModal);
}

/* =====================
   CARDS
===================== */

function handleImageClick(name, link) {
  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;
  openModal(imageModal);
}

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardsContainer.prepend(card.getCardElement());
}

/* =====================
   FORM NOVO CARD
===================== */

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: urlInput.value,
  };

  renderCard(newCardData);
  closeModalWithReset(newCardModal);
}

/* =====================
   VALIDAÇÃO
===================== */

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input-error-message",
  errorClass: "popup__input-error-message_active",
};

const editFormValidator = new FormValidator(validationConfig, editForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

/* =====================
   INICIALIZAÇÃO
===================== */

initialCards.forEach(renderCard);

/* =====================
   EVENTOS
===================== */

// Abrir popups
editButton.addEventListener("click", handleOpenEditModal);
newCardButton.addEventListener("click", () => openModal(newCardModal));

// Fechar popups (botão X)
closeEditButton.addEventListener("click", () => closeModalWithReset(editModal));
closeNewCardButton.addEventListener("click", () =>
  closeModalWithReset(newCardModal),
);
closeImageButton.addEventListener("click", () => closeModal(imageModal));

// Submit forms
editForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

// Fechar clicando fora (overlay)
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModalWithReset(popup);
    }
  });
});

// Fechar com ESC
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    if (openedPopup) {
      closeModalWithReset(openedPopup);
    }
  }
});
