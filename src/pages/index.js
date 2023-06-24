//IMPORTS
import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';
import PopupWithDelete from '../components/PopupWithDelete';

import {
  addCardButton,
  editButton,
  validationConfig,
  formsToValidate,
  popupShowImageSelector,
  cardContainerSelector,
  popupAddCardSelector,
  userData,
  profilePopupSelector,
  popupDeleteCardSelector,
  popupAddAvatarSelector,
  editAvatarButton
} from '../utils/constants.js';



//FUNCTIONS


// Universal validation enabling func
function enableValidation(validationConfig) {
  //Get all forms on page
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  //Set validation for each form
  formList.forEach((formElement) => {
    const validatorElement = new FormValidator(validationConfig, formElement);
    //get name attribute (profile-form and addCard-form)
    const formName = formElement.getAttribute('name');
    validatorElement.enableValidation();
    formsToValidate[formName] = validatorElement;
  });
}
//Class instances and validation but not universal
// const newProfileForm = new FormValidator(validationConfig, profileForm);
// const newAddCardForm = new FormValidator(validationConfig, addCardForm);

// newProfileForm.enableValidation();
// newAddCardForm.enableValidation();

//CREATE INSTANCES

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'f78dfab2-6599-42af-8d1e-761437f71dcf',
    'Content-Type': 'application/json'
  }
});




//Initial user info from page by get-method and new user info from inputs by set-method
const userInfo = new UserInfo(userData)


//Fullscreen image popup instance
const popupImage = new PopupWithImage(popupShowImageSelector);



function createNewCard(item) {
  const card = new Card(item, '#card', popupImage.open, popupWithDelete.open, (likeIcon, cardId) => {
    if (likeIcon.classList.contains("card__like_active")) {
      api.deleteLike(cardId)
      .then((res) => {
        card.likeCard(res.likes)
      })
      .catch((err) => console.error(`Ошибка удаления лайка: ${err}`));
    } else {
      api.addLike(cardId)
      .then((res) => {
        card.likeCard(res.likes)
      })
      .catch((err) => console.error(`Ошибка добавления лайка: ${err}`));
    }
  });
  
    const newCard = card.generateCard();
    return newCard
}

// Initial cards 
const section = new Section( (data) => {
    section.addItemAppend(createNewCard(data));
  }
, cardContainerSelector)



//delete popup
const popupWithDelete = new PopupWithDelete(popupDeleteCardSelector, (cardElement, cardId) => {
  api.deleteCard(cardId)
  .then((res) => {
    //res is a message here, dont need it
    cardElement.deleteCardFromDom();
    popupWithDelete.close();
  })
  .catch((err) => console.error(`Ошибка удаления карточки: ${err}`))
  .finally(() => popupWithDelete.setInitialText())
})


//Profile popup
const profilePopupElement = new PopupWithForm(profilePopupSelector, (inputsValue) => {
    api.editUserInfo(inputsValue)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopupElement.close();
    })
    .catch((err) => console.error(`Ошибка обновления данных пользователя: ${err}`))
    .finally(() => profilePopupElement.setInitialText())
  });

//add Avatar popup
const popupAddAvatar = new PopupWithForm(popupAddAvatarSelector, (inputsValue) => {
  api.editAvatar(inputsValue).then((res) => {
      userInfo.setUserInfo(res);
      popupAddAvatar.close();
    })
    .catch((err) => console.error(`Ошибка изменения аватара: ${err}`))
    .finally(() => popupAddAvatar.setInitialText())
})



//Add card popup 
const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputsValue) => {
  //this func has already taken inputsValue by getInputsValue method
  //inputsValue is an object 
  //getInputsValue takes values by name attribute!!! must monitore it
  api.addNewCard(inputsValue)
  .then((card) => {
    card.id = userInfo.getUserId();
    section.addItem(createNewCard(card));
    popupAddCard.close();
  })
  .catch((err) => {
    console.error(`Ошибка добавления карточки: ${err}`);
  })
  .finally(() => popupAddCard.setInitialText());
});





//HANDLERS
popupAddCard.setEventListeners();
popupImage.setEventListeners();
profilePopupElement.setEventListeners();
popupAddAvatar.setEventListeners();
popupWithDelete.setEventListeners();

// Open popup
editButton.addEventListener('click', () => {
  formsToValidate['profile-form'].resetValidation();
  //set info from page
  profilePopupElement.setInputsValue(userInfo.getUserInfo());
  profilePopupElement.open()
});

addCardButton.addEventListener('click', () => {
  popupAddCard.open();
  formsToValidate['addCard-form'].resetValidation();
});

editAvatarButton.addEventListener('click', () => {
  formsToValidate['addAvatar-form'].resetValidation();
  popupAddAvatar.open();
})





//FUNCTIONS.exe

//Forms validation
enableValidation(validationConfig);


Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([user, cards]) => {
    
    //change userInfo, use destructing
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar, id: user._id});
    cards.forEach((cardElement) => {cardElement.id = user._id});
    section.addCards(cards);
    console.log(cards);
  })
  .catch((err) => console.error(`Ошибка загрузки карточек: ${err}`));