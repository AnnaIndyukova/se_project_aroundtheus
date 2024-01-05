export default class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      settingsObject.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(settingsObject.inputSelector)
    );
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElement);
    } else {
      this._buttonElement.classList.remove(
        this._settingsObject.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
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
    this._disableButton(this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
