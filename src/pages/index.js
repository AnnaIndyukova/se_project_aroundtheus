import "../pages/index.css";
import logoSrc from "../images/Logo-around.svg";
import penSrc from "../images/Edit-button.svg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import {
  cardListSectionSelector,
  cardSelector,
  modalWindowEditSelector,
  modalWindowAddSelector,
  modalWindowImageSelector,
  modalWindowConfirmationSelector,
  modalWindowUpdateAvatarSelector,
  profileNameSelector,
  profileOccupationSelector,
  profileAvatarSelector,
  profileAvatar,
  addButton,
  editButton,
  settingsObject,
  profileFormName,
  addCardFormName,
  updateAvatarFormName,
  token,
  baseUrl,
  buttonTextSaving,
} from "../utils/constants.js";

document.getElementById("image-logo").src = logoSrc;
document.getElementById("image-edit-avatar").src = penSrc;

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

//universal function for handling forms submit
function handleSubmit(request, popupInstance) {
  popupInstance.renderUpoading(true);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderUpoading(false);
    });
}

// object for storing all validators
const formValidators = {};
const enableValidation = (settingsObject) => {
  const formList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(settingsObject, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settingsObject);

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector,
  avatarSelector: profileAvatarSelector,
});

// getting user info from server
api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch(console.error);

function handleEditProfileFormSubmit(data) {
  function makeRequest() {
    return api.editUserInfo(data).then((result) => {
      userInfo.setUserInfo(result);
    });
  }
  handleSubmit(makeRequest, editUserInfoPopup);
}

//popup with form for User Info editing
const editUserInfoPopup = new PopupWithForm(
  modalWindowEditSelector,
  handleEditProfileFormSubmit,
  "Save",
  buttonTextSaving
);
editUserInfoPopup.setEventListeners();
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editUserInfoPopup.setInputValues(data);
  formValidators[profileFormName].resetValidation();
  editUserInfoPopup.open();
});

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}
function handleDeleteButtonClick(id, card) {
  deleteConfirmationPopup.open();
  deleteConfirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(id)
      .then(() => {
        deleteConfirmationPopup.close();
        card.deleteCardFromPage();
      })
      .catch(console.error);
  });
}

function handleLikeButtonClick(id, card, isLiked) {
  if (isLiked) {
    api
      .removeLike(id)
      .then((res) => {
        card.toggleLikeOnPage(res.isLiked);
      })
      .catch(console.error);
  } else {
    api
      .addLike(id)
      .then((res) => {
        card.toggleLikeOnPage(res.isLiked);
      })
      .catch(console.error);
  }
}

function createCard(item) {
  const cardElement = new Card(
    item,
    cardSelector,
    () => handleImageClick(item),
    handleDeleteButtonClick,
    handleLikeButtonClick
  );
  return cardElement.generateCard();
}

const cardsList = new Section(
  { items: [], renderer: createCard },
  cardListSectionSelector
);

api
  .getInitialCards()
  .then((result) => {
    cardsList.setItems(result);
    cardsList.renderItems();
  })
  .catch(console.error);

function handleAddCardFormSubmit(data) {
  function makeRequest() {
    return api.addNewCard(data).then((result) => {
      const newCard = createCard(result);
      cardsList.addItem(newCard);
    });
  }
  handleSubmit(makeRequest, addNewPlacePopup);
}

//popup with form for adding a place
const addNewPlacePopup = new PopupWithForm(
  modalWindowAddSelector,
  handleAddCardFormSubmit,
  "Create",
  buttonTextSaving
);
addNewPlacePopup.setEventListeners();
addButton.addEventListener("click", () => {
  formValidators[addCardFormName].resetValidation();
  addNewPlacePopup.open();
});

//popup with Image preview
const imagePreviewPopup = new PopupWithImage(modalWindowImageSelector);
imagePreviewPopup.setEventListeners();

//popup with Delete confirmation
const deleteConfirmationPopup = new PopupWithForm(
  modalWindowConfirmationSelector
);
deleteConfirmationPopup.setEventListeners();

function handleUpdateAvatarFormSubmit(avatarLink) {
  function makeRequest() {
    return api.updateUserAvatar(avatarLink).then((result) => {
      userInfo.setUserInfo(result);
    });
  }
  handleSubmit(makeRequest, updateAvatarPopup);
}

//popup for Avatar update
const updateAvatarPopup = new PopupWithForm(
  modalWindowUpdateAvatarSelector,
  handleUpdateAvatarFormSubmit,
  "Save",
  buttonTextSaving
);
updateAvatarPopup.setEventListeners();
profileAvatar.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  updateAvatarPopup.setInputValues(data);
  formValidators[updateAvatarFormName].resetValidation();
  updateAvatarPopup.open();
});
