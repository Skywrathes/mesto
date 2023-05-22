//IMPORTS
import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


//find elements in DOM
//Profile elements
const nameOnPage = document.querySelector('.profile__name');
const aboutOnPage = document.querySelector('.profile__about');
const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

//Cards
const photoGrid = document.querySelector('.photo-grid');

//Popups
const popupList = document.querySelectorAll('.popup');

// Edit profile popup
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = document.forms['profile-form'];
const editProfileNameInput = profileForm.querySelector('.edit-form__input_profile-name');
const editProfileAboutInput = profileForm.querySelector('.edit-form__input_profile-about');
const closeEditProfilePopup = editProfilePopup.querySelector('.popup__close_edit-form');


// Add new card popup
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = document.forms['addCard-form'];
const addCardTitleInput = addCardForm.querySelector('.edit-form__input_card-title');
const addCardLinkInput = addCardForm.querySelector('.edit-form__input_card-link');
const closeAddCardPopup = addCardPopup.querySelector('.popup__close_add-card');

// Fullscreen image show popup
const showImagePopup = document.querySelector('.popup_type_show-image');
const closeShowImagePopup = showImagePopup.querySelector('.popup__close_image-fullscreen');
const fullscreenPopupImage = showImagePopup.querySelector('.popup__image');
const fullscreenPopupImageTitle = showImagePopup.querySelector('.popup__image-title');


//Validation variables
const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save',
  inactiveButtonClass: 'edit-form__save_type_inactive',
  inputErrorClass: '.edit-form__input-error',
  inputErrorClassActive: 'edit-form__input_type-error',
  errorMessageClass: 'edit-form__input-error_active',
};
const formsToValidate = {profileForm, addCardForm}

//Class instances and validation but not universal
// const newProfileForm = new FormValidator(validationConfig, profileForm);
// const newAddCardForm = new FormValidator(validationConfig, addCardForm);

// newProfileForm.enableValidation();
// newAddCardForm.enableValidation();


//FUNCTIONS


// Universal validation enabling func
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    const validatorElement = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');

    formsToValidate[formName] = validatorElement;
    validatorElement.enableValidation();
  });
}

//Popups open func
function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

//Popups close func
function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

//Close opened popup by ESCAPE btn
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//Submit profile func
function handleFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  const name = editProfileNameInput.value;
  const about = editProfileAboutInput.value;
  // choose elements to change and change them using textContent
  nameOnPage.textContent = name;
  aboutOnPage.textContent = about;
  closePopup(editProfilePopup);
}

//Render initial cards func
function renderCards(dataObject) {
  dataObject.forEach((item) => {
    photoGrid.append(createCard(item));
  })
}

//Create new card using template
function createCard(item) {
  const card = new Card(item.text, item.image, '#card', openFullscreen);
  const newCard = card.generateCard();
  return newCard;
}

//Open fullscreen image func
function openFullscreen(text, image) {
  fullscreenPopupImage.src = image;
  fullscreenPopupImage.alt = text;
  fullscreenPopupImageTitle.textContent = text;

  openPopup(showImagePopup);
  }


//Insertion of new cards func
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  // Create obj from inputs to use in createCard func
  const newCardObj = {
    text: addCardTitleInput.value,
    image: addCardLinkInput.value
  };

  //add card to the beginning of photoGrid
  photoGrid.prepend(createCard(newCardObj));
  closePopup(addCardPopup);
}



//HANDLERS

// Open popup
editButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  editProfileNameInput.value = nameOnPage.textContent;
  editProfileAboutInput.value = aboutOnPage.textContent;
  formsToValidate['profile-form'].resetValidation();
});

// Close popups
closeEditProfilePopup.addEventListener('click', () => closePopup(editProfilePopup));
closeAddCardPopup.addEventListener('click', () => closePopup(addCardPopup));
closeShowImagePopup.addEventListener('click', () => closePopup(showImagePopup));

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  addCardForm.reset();
  formsToValidate['addCard-form'].resetValidation();
});


// Submit listeners
profileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', handleCardFormSubmit);


//close popups with background click
popupList.forEach(function(popupElement){
  popupElement.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup')) {
    closePopup(event.target);
    }
});
});



//FUNCTIONS.exe

//Insertion of initial cards
renderCards(initialCards);

//Forms validation
enableValidation(validationConfig);


