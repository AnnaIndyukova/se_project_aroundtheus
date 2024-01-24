import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewModalImage = document.querySelector(".modal__image");
    this._previewModalInscript = document.querySelector(".modal__inscript");
  }

  open(data) {
    this._previewModalImage.src = data.link;
    this._previewModalImage.alt = data.name;
    this._previewModalInscript.textContent = data.name;
    super.open();
  }
}
