import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText, buttonTextSaving) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__save-button");
    this._buttonText = buttonText;
    this._buttonTextSaving = buttonTextSaving;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setSubmitAction(callBack) {
    this._handleFormSubmit = callBack;
  }

  renderUpoading(inProcess) {
    if (inProcess) {
      this._submitButton.textContent = this._buttonTextSaving;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
