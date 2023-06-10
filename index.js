//IMPORTS

import { Card } from './scripts/components/Card.js';
import { FormValidator } from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

import {
  initialCards,
  addCardButton,
  editButton,
  validationConfig,
  profileForm,
  addCardForm,
  formsToValidate,
  popupShowImageSelector,
  cardContainerSelector,
  popupAddCardSelector,
  userData,
  profilePopupSelector
} from './scripts/utils/constants.js';

// import Popup from './scripts/components/Popup.js';


//find elements in DOM
//Profile elements
// const nameOnPage = document.querySelector('.profile__name');
// const aboutOnPage = document.querySelector('.profile__about');


//Cards
// const photoGrid = document.querySelector('.photo-grid');

// //Popups
// const popupList = document.querySelectorAll('.popup');

// // Edit profile popup
// const editProfilePopup = document.querySelector('.popup_type_edit-profile');
// // const profileForm = document.forms['profile-form'];
// const editProfileNameInput = profileForm.querySelector('.edit-form__input_profile-name');
// const editProfileAboutInput = profileForm.querySelector('.edit-form__input_profile-about');


// // Add new card popup
// const addCardPopup = document.querySelector('.popup_type_add-card');
// // const addCardForm = document.forms['addCard-form'];
// const addCardTitleInput = addCardForm.querySelector('.edit-form__input_card-title');
// const addCardLinkInput = addCardForm.querySelector('.edit-form__input_card-link');

// Fullscreen image show popup
// const showImagePopup = document.querySelector('.popup_type_show-image');
// // const fullscreenPopupImage = showImagePopup.querySelector('.popup__image');
// const fullscreenPopupImageTitle = showImagePopup.querySelector('.popup__image-title');

// const formsToValidate = {profileForm, addCardForm};


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

//Initial user info from page by get-method and new user info from inputs by set-method
const userInfo = new UserInfo(userData);


//Profile popup
const profilePopupElement = new PopupWithForm(profilePopupSelector, (inputsValue) => {
    userInfo.setUserInfo(inputsValue);
    profilePopupElement.close();
  });

//Add card popup 
const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputsValue) => {
  //this func has already taken inputsValue by getInputsValue method
  //inputsValue is an object 
  //getInputsValue takes values by name attribute!!! must monitore it
  section.addItem(inputsValue);
  popupAddCard.close();
});

const popupImage = new PopupWithImage(popupShowImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.text, item.image, '#card', popupImage.open);
    const newCard = card.generateCard();
    return newCard;
  }
}, cardContainerSelector)




//HANDLERS
popupAddCard.setEventListeners();
popupImage.setEventListeners();
profilePopupElement.setEventListeners();

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



//FUNCTIONS.exe

//add initial cards
section.addCards();

//Forms validation
enableValidation(validationConfig);


