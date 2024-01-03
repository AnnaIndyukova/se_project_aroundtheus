const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const modalWindowEdit = document.querySelector(".modal-edit-profile");
const modalWindowAdd = document.querySelector(".modal-add-card");
const modalWindowImage = document.querySelector(".modal-image-preview");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const nameInput = document.querySelector(".modal__input_type_name");
const occupationInput = document.querySelector(".modal__input_type_occupation");
const placeTitleInput = document.querySelector(
  ".modal__input_type_place-title"
);
const imageLinkInput = document.querySelector(".modal__input_type_image-link");
const profileFormElement = document.forms["profile-edit-form"];
const addCardFormElement = document.forms["add-place-form"];
const previewModalImage = document.querySelector(".modal__image");
const previewModalInscript = document.querySelector(".modal__inscript");

function closeOpenedPopupListener(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popupItem) => {
      if (popupItem.classList.contains("modal_opened")) {
        closePopup(popupItem);
      }
    });
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeOpenedPopupListener);
  if (modal == modalWindowEdit) {
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    formValidatorProfile.resetValidation();
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeOpenedPopupListener);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closePopup(modalWindowEdit);
}

function handleImageClick(cardData) {
  previewModalImage.src = cardData._image;
  previewModalImage.alt = cardData._text;
  previewModalInscript.textContent = cardData._text;
  openPopup(modalWindowImage);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = placeTitleInput.value;
  const cardLink = imageLinkInput.value;
  const card = new Card(
    { name: cardTitle, link: cardLink },
    "#card",
    handleImageClick
  );
  cardList.prepend(card.generateCard());
  evt.target.reset();
  formValidatorAdd.resetValidation();
  closePopup(modalWindowAdd);
}

editButton.addEventListener("click", () => openPopup(modalWindowEdit));
addButton.addEventListener("click", () => openPopup(modalWindowAdd));

// enable form validation
const settingsObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
import FormValidator from "../components/formValidator.js";
const formValidatorProfile = new FormValidator(
  settingsObject,
  profileFormElement
);
formValidatorProfile.enableValidation();
const formValidatorAdd = new FormValidator(settingsObject, addCardFormElement);
formValidatorAdd.enableValidation();

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// create initial cards
const cardList = document.querySelector(".elements__list");
import Card from "../components/card.js";
initialCards.forEach((item) => {
  const card = new Card(item, "#card", handleImageClick);
  cardList.append(card.generateCard());
});

// add listeners for popups closing
const popups = document.querySelectorAll(".modal");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closePopup(popup);
    }
  });
});
