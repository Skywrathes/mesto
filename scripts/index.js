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

//Popups open func
const openPopup = function (el) {
  el.classList.add('popup_opened');
}

//Popups close func
const closePopup = function (el) {
  el.classList.remove('popup_opened');
}

// Close popups
closeEditProfilePopup.addEventListener('click', () => closePopup(editProfilePopup));
closeAddCardPopup.addEventListener('click', () => closePopup(addCardPopup));
closeShowImagePopup.addEventListener('click', () => closePopup(showImagePopup));


// Open popup
editButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  editProfileNameInput.value = nameOnPage.textContent;
  editProfileAboutInput.value = aboutOnPage.textContent;
});
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  addCardTitleInput.value = '';
  addCardLinkInput.value = '';
});

//Open popup with fullscreen image
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

// Submit listeners
profileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addFormSubmit);


//Like
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList == 'card__like') {
    if (event.target.src.includes('LikeActive')) {
    event.target.src = "./images/Like.svg";
  } else if (event.target.src.includes('Like.svg')) {
    event.target.src = "./images/LikeActive.svg";
  }}
})

// const likeBtn = photoGrid.querySelectorAll('.card__like-btn');
// //Like
// likeBtn.forEach(item => {
//   item.addEventListener('click', function (event) {
//     if (event.target.src.includes('LikeActive')) {
//       event.target.src = "./images/Like.svg";
//     } else if (event.target.src.includes('Like.svg')) {
//       event.target.src = "./images/LikeActive.svg";
//     }
//   })
// }); Не работает на добавленных карточках, поэтому слушатель нужно вешать через делегирование
