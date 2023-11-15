let initialCards = [
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
const closeButton = document.querySelector(".modal__close-button");
const modalWindow = document.querySelector(".modal");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const nameInput = document.querySelector(".modal__input_name");
const occupationInput = document.querySelector(".modal__input_occupation");
const profileFormElement = document.querySelector(".modal__form");

function toggleModalVisibilyty() {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  modalWindow.classList.toggle("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  modalWindow.classList.toggle("modal_opened");
}

editButton.addEventListener("click", toggleModalVisibilyty);
closeButton.addEventListener("click", toggleModalVisibilyty);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

let cardTemplate = document.querySelector("#card").content;
let cardList = document.querySelector(".elements__list");

function getCardElement(data) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardTitle = data.name;
  let cardImage = data.link;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  return cardElement;
}

for (let cardData of initialCards) {
  cardList.append(getCardElement(cardData));
}
