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

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closePopup(modalWindowEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = placeTitleInput.value;
  const cardLink = imageLinkInput.value;
  cardList.prepend(getCardElement({ name: cardTitle, link: cardLink }));
  evt.target.reset();
  const buttonElement = evt.target.querySelector(".modal__save-button");
  buttonElement.classList.add("modal__save-button-disabled");
  closePopup(modalWindowAdd);
}

editButton.addEventListener("click", () => openPopup(modalWindowEdit));
addButton.addEventListener("click", () => openPopup(modalWindowAdd));

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");

  const cardTitle = cardData.name;
  const cardImage = cardData.link;
  cardImageElement.src = cardImage;
  cardImageElement.alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = cardData.link;
    previewModalImage.alt = cardData.name;
    previewModalInscript.textContent = cardData.name;
    openPopup(modalWindowImage);
  });

  return cardElement;
}

const cardList = document.querySelector(".elements__list");
initialCards.forEach((item) => {
  cardList.append(getCardElement(item));
});

nameInput.value = profileName.textContent;
occupationInput.value = profileOccupation.textContent;

const popups = Array.from(document.querySelectorAll(".modal"));
function closeOpenedPopup() {
  popups.forEach((popupItem) => {
    if (popupItem.classList.contains("modal_opened")) {
      closePopup(popupItem);
    }
  });
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeOpenedPopup();
  }
});

popups.forEach((popupItem) => {
  popupItem.addEventListener("click", (evt) => {
    evt.preventDefault;
    if (evt.target == popupItem) {
      closeOpenedPopup();
    }
  });
});
