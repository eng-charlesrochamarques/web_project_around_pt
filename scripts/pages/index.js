import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationConfig } from "../utils/constants.js";

/* ===== User ===== */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

/* ===== Validation ===== */
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);
newCardFormValidator.setEventListeners();

/* ===== Popups ===== */
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    description: data.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  cardSection.addItem(createCard(data));
  newCardPopup.close();
});
newCardPopup.setEventListeners();

/* ===== Cards ===== */
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  return card.getCardElement();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);

cardSection.renderItems();

/* ===== Buttons ===== */
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();

    document.querySelector(".popup__input_type_name").value = userData.name;
    document.querySelector(".popup__input_type_description").value =
      userData.description;

    // 🔹 reset da validação
    editFormValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  // 🔹 reset da validação
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});
