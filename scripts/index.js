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
const closeButtonEditProfile = document.querySelector(
  ".modal__close-button_type_edit-profile"
);
const closeButtonAddCard = document.querySelector(
  ".modal__close-button_type_add-card"
);
const closeButtonImagePreview = document.querySelector(
  ".modal__close-button_type_image-preview"
);

const modalWindowEdit = document.querySelector(".modal__type_edit-profile");
const modalWindowAdd = document.querySelector(".modal__type_add-card");
const modalWindowImage = document.querySelector(".modal__type_image-preview");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const nameInput = document.querySelector(".modal__input_type_name");
const occupationInput = document.querySelector(".modal__input_type_occupation");
let cardTitle;
let cardLink;
const placeTitleInput = document.querySelector(
  ".modal__input_type_place-title"
);
const imageLinkInput = document.querySelector(".modal__input_type_image-link");
const profileFormElement = document.querySelector(".modal__form_type_profile");
const addCardFormElement = document.querySelector(".modal__type_add-card");

function openModalEdit() {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  modalWindowEdit.classList.add("modal_opened");
}

function openModalAdd() {
  placeTitleInput.value = "";
  imageLinkInput.value = "";
  modalWindowAdd.classList.add("modal_opened");
}

function openModalPreviewImage() {
  modalWindowImage.classList.add("modal_opened");
}

function closeModal(win) {
  win.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closeModal(modalWindowEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardTitle = placeTitleInput.value;
  cardLink = imageLinkInput.value;
  cardList.prepend(getCardElement({ name: cardTitle, link: cardLink }));
  closeModal(modalWindowAdd);
}

editButton.addEventListener("click", openModalEdit);
addButton.addEventListener("click", openModalAdd);
closeButtonEditProfile.addEventListener("click", () =>
  closeModal(modalWindowEdit)
);
closeButtonAddCard.addEventListener("click", () => closeModal(modalWindowAdd));
closeButtonImagePreview.addEventListener("click", () =>
  closeModal(modalWindowImage)
);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardData.name;
  const cardImage = cardData.link;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.parentElement.remove();
  });

  const cardImageElement = cardElement.querySelector(".card__image");
  const previewModalImage = document.querySelector(".modal__image");
  const previewModalInscript = document.querySelector(".modal__inscript");
  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = cardData.link;
    previewModalImage.alt = cardData.name;
    previewModalInscript.textContent = cardData.name;
    openModalPreviewImage();
  });

  return cardElement;
}

const cardList = document.querySelector(".elements__list");
initialCards.forEach((item) => {
  cardList.append(getCardElement(item));
});
