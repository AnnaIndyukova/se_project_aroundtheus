export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButtonClick,
    handleLikeButtonClick
  ) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._text = data.name;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._element = cardElement;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this._id, this, this._isLiked);
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this._id, this);
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  generateCard() {
    this._getTemplate();
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._cardImageElement = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._cardImageElement.src = this._image;
    this._cardImageElement.alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button-active");
    }
    return this._element;
  }

  deleteCardFromPage() {
    this._element.remove();
  }

  toggleLikeOnPage(isLiked) {
    this._isLiked = isLiked;
    this._cardLikeButton.classList.toggle("card__like-button-active");
  }
}
