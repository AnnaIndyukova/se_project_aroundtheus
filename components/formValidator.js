export default class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settingsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settingsObject.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settingsObject.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settingsObject.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._settingsObject.submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    const buttonElement = this._formElement.querySelector(
      this._settingsObject.submitButtonSelector
    );
    buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
    buttonElement.disabled = true;

    const inputList = this._formElement.querySelectorAll(
      this._settingsObject.inputSelector
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
