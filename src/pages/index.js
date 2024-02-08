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
  profileFormElement,
  addCardFormElement,
  updateAvatarFormElement,
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
  .catch((err) => {
    console.error(err);
  });

function handleEditProfileFormSubmit(data) {
  editUserInfoPopup.renderUpoading(true);
  api
    .editUserInfo(data)
    .then((result) => {
      userInfo.setUserInfo(result);
      editUserInfoPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editUserInfoPopup.renderUpoading(false);
    });
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
  formValidatorProfile.resetValidation();
  editUserInfoPopup.open();
});
const formValidatorProfile = new FormValidator(
  settingsObject,
  profileFormElement
);
formValidatorProfile.enableValidation();

function handleImageClick(data) {
  imagePreviewPopup.open(data);
}
function handleDeleteButtonClick(id, card) {
  DeleteConfirmationPopup.open();
  DeleteConfirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(id)
      .then(() => {
        DeleteConfirmationPopup.close();
        card.deleteCardFromPage();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeButtonClick(id, card, isLiked) {
  if (isLiked) {
    api
      .removeLike(id)
      .then((res) => {
        card.toggleLikeOnPage(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(id)
      .then((res) => {
        card.toggleLikeOnPage(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
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

api
  .getInitialCards()
  .then((result) => {
    const cardsList = new Section(
      { items: result, renderer: createCard },
      cardListSectionSelector
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

function handleAddCardFormSubmit(data) {
  addNewPlacePopup.renderUpoading(true);
  api
    .addNewCard(data)
    .then((result) => {
      const newCard = createCard(result);
      const cardsList = new Section(
        { items: result, renderer: createCard },
        cardListSectionSelector
      );
      cardsList.addItem(newCard);
      addNewPlacePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addNewPlacePopup.renderUpoading(false);
    });
}

//popup with form for adding a place
const addNewPlacePopup = new PopupWithForm(
  modalWindowAddSelector,
  handleAddCardFormSubmit,
  "Create",
  buttonTextSaving
);
addNewPlacePopup.setEventListeners();
const formValidatorAdd = new FormValidator(settingsObject, addCardFormElement);
formValidatorAdd.enableValidation();
addButton.addEventListener("click", () => {
  formValidatorAdd.resetValidation();
  addNewPlacePopup.open();
});

//popup with Image preview
const imagePreviewPopup = new PopupWithImage(modalWindowImageSelector);
imagePreviewPopup.setEventListeners();

//popup with Delete confirmation
const DeleteConfirmationPopup = new PopupWithForm(
  modalWindowConfirmationSelector
);
DeleteConfirmationPopup.setEventListeners();

function handleUpdateAvatarFormSubmit(avatarLink) {
  updateAvatarPopup.renderUpoading(true);
  api
    .updateUserAvatar(avatarLink)
    .then((result) => {
      userInfo.setUserInfo(result);
      updateAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateAvatarPopup.renderUpoading(false);
    });
}
//popup for Avatar update
const updateAvatarPopup = new PopupWithForm(
  modalWindowUpdateAvatarSelector,
  handleUpdateAvatarFormSubmit,
  "Save",
  buttonTextSaving
);
updateAvatarPopup.setEventListeners();
const formValidatorUpdateAvatar = new FormValidator(
  settingsObject,
  updateAvatarFormElement
);
formValidatorUpdateAvatar.enableValidation();
profileAvatar.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  updateAvatarPopup.setInputValues(data);
  formValidatorUpdateAvatar.resetValidation();
  updateAvatarPopup.open();
});
