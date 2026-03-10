import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);

    this._handleConfirm = handleConfirm;
    this._submitButton = this._popup.querySelector(".popup__button");
  }

  setCard(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId, this._cardElement);
    });
  }
}
