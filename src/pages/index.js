import "../pages/index.css";
import logoSrc from "../images/Logo-around.svg";
import avatarSrc from "../images/Avatar.png";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardListSectionSelector,
  cardSelector,
  modalWindowEditSelector,
  modalWindowAddSelector,
  modalWindowImageSelector,
  profileNameSelector,
  profileOccupationSelector,
  addButton,
  editButton,
  settingsObject,
  profileFormElement,
  addCardFormElement,
  nameInput,
  occupationInput,
} from "../utils/constants.js";

document.getElementById("image-logo").src = logoSrc;
document.getElementById("image-avatar").src = avatarSrc;

// User Info
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector,
});

//popup with form for User Info editing
function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editUserInfoPopup.close();
}
const editUserInfoPopup = new PopupWithForm(
  modalWindowEditSelector,
  handleEditProfileFormSubmit
);
editUserInfoPopup.setEventListeners();
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  occupationInput.value = data.occupation;
  formValidatorProfile.resetValidation();
  editUserInfoPopup.open();
});
const formValidatorProfile = new FormValidator(
  settingsObject,
  profileFormElement
);
formValidatorProfile.enableValidation();

//render initial cards
function handleImageClick(data) {
  imagePreviewPopup.open(data);
}
function renderCard(item) {
  const card = new Card(item, cardSelector, () => handleImageClick(item));
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}
const cardsList = new Section(
  { items: initialCards, renderer: renderCard },
  cardListSectionSelector
);
cardsList.renderItems();

//popup with form for adding a place
function handleAddCardFormSubmit(data) {
  renderCard(data);
  addNewPlacePopup.close();
}
const addNewPlacePopup = new PopupWithForm(
  modalWindowAddSelector,
  handleAddCardFormSubmit
);
addNewPlacePopup.setEventListeners();
const formValidatorAdd = new FormValidator(settingsObject, addCardFormElement);
formValidatorAdd.enableValidation();
addButton.addEventListener("click", () => addNewPlacePopup.open());

//popup With Image preview
const imagePreviewPopup = new PopupWithImage(modalWindowImageSelector);
imagePreviewPopup.setEventListeners();
