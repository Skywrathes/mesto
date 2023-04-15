//find elements in DOM
//Profile elements
const nameOnPage = document.querySelector('.profile__name');
const aboutOnPage = document.querySelector('.profile__about');
const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

//Cards
const photoGrid = document.querySelector('.photo-grid');

// Edit profile popup
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = document.querySelector('.edit-form_profile_submit');
const editProfileNameInput = profileForm.querySelector('.edit-form__input_profile_name');
const editProfileAboutInput = profileForm.querySelector('.edit-form__input_profile_about');
const closeEditProfilePopup = editProfilePopup.querySelector('.popup__close_edit_form');


// Add new card popup
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.edit-form_card_submit');
const addCardTitleInput = addCardForm.querySelector('.edit-form__input_card_title');
const addCardLinkInput = addCardForm.querySelector('.edit-form__input_card_link');
const closeAddCardPopup = addCardPopup.querySelector('.popup__close_card_add');

// Fullscreen image show popup
const showImagePopup = document.querySelector('.popup_type_show-image');
const closeShowImagePopup = showImagePopup.querySelector('.popup__close_image_fullscreen');
const fullscreenPopupImage = showImagePopup.querySelector('.popup__image');
const fullscreenPopupImageTitle = showImagePopup.querySelector('.popup__image-title');

//Template for new card
const cardTemplate = document.querySelector('#card');

function createCard(item) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = item.name;
  newCard.querySelector('.card__image').src = item.link;
  newCard.querySelector('.card__image').alt = item.name;
  return newCard;
}

//Insertion of initial cards
initialCards.forEach(function (item) {
  photoGrid.append(createCard(item));
});

//Card delete 
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList != 'card__delete-icon') return;
  const closestCard = event.target.closest('.card');
  closestCard.remove();
})

//Edit Popup open func with getting the text content from page
const editProfilePopupOpen = function () {
  editProfilePopup.classList.add('popup_opened');
  editProfileNameInput.value = nameOnPage.textContent;
  editProfileAboutInput.value = aboutOnPage.textContent;
}

// AddCard popup open func
const addCardPopupOpen = function () {
  addCardPopup.classList.add('popup_opened');
  addCardTitleInput.value = '';
  addCardLinkInput.value = '';
}


//Fullscreen popup open func
const showImagePopupOpen = function () {
  showImagePopup.classList.add('popup_opened');
}

//Edit popup close func
const editProfilePopupClose = function () {
  editProfilePopup.classList.remove('popup_opened');
}

//AddCard popup close func
const addCardPopupClose = function () {
  addCardPopup.classList.remove('popup_opened');
}

//Fullscreen popup close func
const showImagePopupClose = function () {
  showImagePopup.classList.remove('popup_opened');
}

// Close popups
closeEditProfilePopup.addEventListener('click', editProfilePopupClose);
closeAddCardPopup.addEventListener('click', addCardPopupClose);
closeShowImagePopup.addEventListener('click', showImagePopupClose);


// Open popup
editButton.addEventListener('click', editProfilePopupOpen);
addCardButton.addEventListener('click', addCardPopupOpen);

//Open popup with fullscreen image
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList == 'card__image') {
    fullscreenPopupImage.src = event.target.src;
    fullscreenPopupImage.alt = event.target.alt;
    //find nearest card title
    //console.log(event.target.closest('.card').querySelector('.card__title').textContent);
    fullscreenPopupImageTitle.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    //There is also an option to get target.event.alt
    showImagePopupOpen();
  }
});



//Submit profile func
function handleFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  const name = editProfileNameInput.value;
  const about = editProfileAboutInput.value;
  // choose elements to change and change them using textContent
  nameOnPage.textContent = name;
  aboutOnPage.textContent = about;
  editProfilePopupClose();
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
  addCardPopupClose();
}

// Submit listeners
profileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addFormSubmit);


//Like
photoGrid.addEventListener('click', function (event) {
  if (event.target.src.includes('LikeActive')) {
    event.target.src = "./images/Like.svg";
  } else if (event.target.src.includes('Like.svg')) {
    event.target.src = "./images/LikeActive.svg";
  }
})

