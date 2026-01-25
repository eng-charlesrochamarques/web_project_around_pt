export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector,
    );
  }

  _showInputError(input, message) {
    const errorElement = this._formElement.querySelector(
      `.${input.name}-input-error`,
    );
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `.${input.name}-input-error`,
    );
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
  }
}
