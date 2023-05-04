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
const profileForm = document.querySelector('.edit-form_profile-submit');
const editProfileNameInput = profileForm.querySelector('.edit-form__input_profile-name');
const editProfileAboutInput = profileForm.querySelector('.edit-form__input_profile-about');
const closeEditProfilePopup = editProfilePopup.querySelector('.popup__close_edit-form');


// Add new card popup
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.edit-form_card-submit');
const addCardTitleInput = addCardForm.querySelector('.edit-form__input_card-title');
const addCardLinkInput = addCardForm.querySelector('.edit-form__input_card-link');
const closeAddCardPopup = addCardPopup.querySelector('.popup__close_add-card');

// Fullscreen image show popup
const showImagePopup = document.querySelector('.popup_type_show-image');
const closeShowImagePopup = showImagePopup.querySelector('.popup__close_image-fullscreen');
const fullscreenPopupImage = showImagePopup.querySelector('.popup__image');
const fullscreenPopupImageTitle = showImagePopup.querySelector('.popup__image-title');

//Template for new card
const cardTemplate = document.querySelector('#card');



//FUNCTIONS

//set listener to like card
function setLikeEventListener(newCard) {
  const likeBtn = newCard.querySelector('.card__like');
  likeBtn.addEventListener('click', function(){
    if (likeBtn.src.includes('LikeActive')) {
      likeBtn.src = "./images/Like.svg";
    } else if (likeBtn.src.includes('Like.svg')) {
      likeBtn.src = "./images/LikeActive.svg";
    }
  })
}

//set listener to delete card
function setDeleteEventListener(newCard) {
  const cardDeleteBtn = newCard.querySelector('.card__delete-icon');
  cardDeleteBtn.addEventListener('click', function(){
    const closestCard = cardDeleteBtn.closest('.card');
    closestCard.remove();
  })
}

//Create new card using template
function createCard(item) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = item.name;
  newCard.querySelector('.card__image').src = item.link;
  newCard.querySelector('.card__image').alt = item.name;
  
  //Like listener
  setLikeEventListener(newCard);

  //Delete listener
  setDeleteEventListener(newCard);

  return newCard;
}

//Insertion of initial cards
function insertInitialCards(initialCards) {
initialCards.forEach(function (item) {
  photoGrid.append(createCard(item));
});
}

//Popups open func
function openPopup(el) {
  el.classList.add('popup_opened');
}

//Popups close func
function closePopup(el) {
  el.classList.remove('popup_opened');
}

//clear input from errors (put into popupOpen func)
function clearInputErrors(popupElement){
  const inputErrorList = popupElement.querySelectorAll('.edit-form__input-error');
  const inputList = Array.from(popupElement.querySelectorAll('.edit-form__input'));

  //delete underlining of input
  inputList.forEach(function(inputElement){
    inputElement.classList.remove('edit-form__input_type-error');
  })

  //delete error message
  inputErrorList.forEach(error => {
    error.classList.remove('edit-form__input-error_active');
  });
}

//Disble btn after popup open and before input event
function disableBtn(popupElement) {
  const buttonElement = popupElement.querySelector('.edit-form__save');
  buttonElement.classList.add('edit-form__save_type_inactive');
  buttonElement.disabled = true;
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

//Insertion of new cards func
function addFormSubmit(evt) {
  evt.preventDefault();
  // Create obj from inputs to use in createCard func
  const newCardObj = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value
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
  clearInputErrors(editProfilePopup);
  disableBtn(editProfilePopup);
});

// Close popups
closeEditProfilePopup.addEventListener('click', () => closePopup(editProfilePopup));
closeAddCardPopup.addEventListener('click', () => closePopup(addCardPopup));
closeShowImagePopup.addEventListener('click', () => closePopup(showImagePopup));

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
//possible to use form.reset
  addCardForm.reset();
  clearInputErrors(addCardPopup);
  disableBtn(addCardPopup);
});

//Open popup with fullscreen image
//The classList property returns a collection of class names, which is an object data type.
//That's why the strict equality operator would not work in this case.
//Possible to use the contains() method of the classList property
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList == 'card__image') {
    fullscreenPopupImage.src = event.target.src;
    fullscreenPopupImage.alt = event.target.alt;
    //find nearest card title
    fullscreenPopupImageTitle.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    //There is also an option to get event.target.alt
    openPopup(showImagePopup);
  }
});

// Submit listeners
profileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addFormSubmit);

//close popups with Esc button
window.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(showImagePopup);
    closePopup(editProfilePopup);
    closePopup(addCardPopup);
  }
});

//close popups with background click
popupList.forEach(function(popupElement){
  popupElement.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup')) {
    closePopup(event.target);
    }
});
});



//FUNCTIONS.exe

insertInitialCards(initialCards);