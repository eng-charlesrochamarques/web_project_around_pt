import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

/* ===== API ===== */
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "60a0ce93-b3b0-4305-8ca5-c7d5ff4ceaa5",
    "Content-Type": "application/json",
  },
});

/* ===== User ===== */
const avatarEditButton = document.querySelector(".profile__image-edit");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
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
  editProfilePopup.renderLoading(true, "Salvando...");

  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });

      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  newCardPopup.renderLoading(true, "Criando...");

  api
    .addCard(data)
    .then((card) => {
      cardSection.addItem(createCard(card));
      newCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListeners();
const deletePopup = new PopupWithConfirmation(
  "#delete-popup",
  (cardId, element) => {
    deletePopup.renderLoading(true);

    api
      .deleteCard(cardId)
      .then(() => {
        element.remove();
        deletePopup.close();
      })
      .catch(console.log)
      .finally(() => {
        deletePopup.renderLoading(false);
      });
  },
);

deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#edit-avatar-modal", handleAvatarSubmit);
function handleAvatarSubmit(data) {
  avatarPopup.renderLoading(true, "Salvando...");

  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}
avatarPopup.setEventListeners();

/* ===== Cards ===== */
let userId;
function createCard(data) {
  console.log("Creating card:", data.name);
  console.log("Card likes:", data.likes);
  console.log("UserId passed to card:", userId);
  const card = new Card(
    data,
    "#card-template",

    (name, link) => {
      imagePopup.open(name, link);
    },

    (cardId, isLiked) => {
      if (!isLiked) {
        api
          .likeCard(cardId)
          .then((updatedCard) => {
            console.log("API RESPONSE:", updatedCard);
            console.log("UPDATED LIKES:", updatedCard.likes);
            card.setIsLiked(updatedCard.isLiked);
          })
          .catch(console.log);
      } else {
        api
          .unlikeCard(cardId)
          .then((updatedCard) => {
            card.setIsLiked(updatedCard.isLiked);
          })
          .catch(console.log);
      }
    },

    (cardId, element) => {
      deletePopup.setCard(cardId, element);
      deletePopup.open();
    },
    userId,
  );

  const cardElement = card.getCardElement();

  const ownerId = data.owner._id || data.owner;

  if (ownerId !== userId) {
    card.hideDeleteButton();
  }

  //card.setLikes(data.likes);
  card.setLikes(data.isLiked);
  return cardElement;
}

const cardSection = new Section(
  {
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".cards__list",
);

//cardSection.renderItems();

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    userId = userData._id;

    console.log("USER ID:", userId);
    console.log("CARDS FROM API:", cards);

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    cardSection.renderItems(cards);
  },
);

/* ===== Avatar validation ===== */
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-avatar-form"),
);

avatarFormValidator.setEventListeners();

/* ===== Buttons ===== */
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();

    document.querySelector(".popup__input_type_name").value = userData.name;
    document.querySelector(".popup__input_type_description").value =
      userData.description;

    editFormValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

if (avatarEditButton) {
  avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
  });
}
