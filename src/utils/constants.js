export const initialCards = [
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

export const cardListSectionSelector = ".elements__list";
export const cardSelector = "#card";
export const modalWindowEditSelector = ".modal-edit-profile";
export const modalWindowAddSelector = ".modal-add-card";
export const modalWindowImageSelector = ".modal-image-preview";
export const profileNameSelector = ".profile__name";
export const profileOccupationSelector = ".profile__occupation";
export const addButton = document.querySelector(".profile__add-button");
export const editButton = document.querySelector(".profile__edit-button");
export const profileFormElement = document.forms["profile-edit-form"];
export const addCardFormElement = document.forms["add-place-form"];
export const settingsObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
