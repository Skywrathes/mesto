//find elements in DOM
const page = document.querySelector('.page');
const profileForm = document.querySelector('.edit-form_profile_submit');
const cardForm = document.querySelector('.edit-form_card_submit');
const nameInput = profileForm.querySelector('.edit-form__input_profile_name');
const aboutInput = profileForm.querySelector('.edit-form__input_profile_about');
const titleInput = cardForm.querySelector('.edit-form__input_card_title');
const linkInput = cardForm.querySelector('.edit-form__input_card_link');
const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const closeEdit = document.querySelector('.popup__close_edit_form');
const closeAdd = document.querySelector('.popup__close_card_add');
const closeImage = document.querySelector('.popup__close_image_fullscreen');
const nameOnPage = document.querySelector('.profile__name');
const aboutOnPage = document.querySelector('.profile__about');
const photoGrid = document.querySelector('.photo-grid');
const addButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card');
const deleteButton = document.querySelectorAll('.card__delete-icon');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Insertion of initial cards
initialCards.forEach(function (item) {
  let newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = item.name;
  newCard.querySelector('.card__image').src = item.link;
  photoGrid.prepend(newCard);
});


//Card delete 
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList != 'card__delete-icon') return;
  let closestCard = event.target.closest('.card');
  closestCard.remove();
})

//Popup open func with getting the text content from page
let popupOpen = function (index) {
  popup[index].classList.add('popup_opened');
  nameInput.value = nameOnPage.textContent;
  aboutInput.value = aboutOnPage.textContent;
  titleInput.value = '';
  linkInput.value = '';
}

//Popup close func
let popupClose = function (index) {
  popup[index].classList.remove('popup_opened');
}

// Open popup
edit.addEventListener('click', () => popupOpen(0));
addButton.addEventListener('click', () => popupOpen(1));

//Open popup with fullscreen image
photoGrid.addEventListener('click', function (event) {
  if (event.target.classList == 'card__image') {
    popupImage.src = event.target.src;
    //find nearest card title
    //console.log(event.target.closest('.card').querySelector('.card__title').textContent);
    popupImageTitle.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
    //There is also an option to get target.event.alt
    popupOpen(2);
  }
});

// Close popups
closeEdit.addEventListener('click', () => popupClose(0));
closeAdd.addEventListener('click', () => popupClose(1));
closeImage.addEventListener('click', () => popupClose(2));

//Submit profile func
function handleFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  let name = nameInput.value;
  let about = aboutInput.value;
  // choose elements to change and change them using textContent
  nameOnPage.textContent = name;
  aboutOnPage.textContent = about;
  popupClose(0);
}

//Insertion of new cards func
function addFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  let newCard = cardTemplate.content.cloneNode(true);
  let title = titleInput.value;
  let link = linkInput.value;
  newCard.querySelector('.card__title').textContent = title;
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__image').alt = title;
  photoGrid.prepend(newCard);
  popupClose(1);
}

// Submit listeners
profileForm.addEventListener('submit', handleFormSubmit);
cardForm.addEventListener('submit', addFormSubmit);


//Like
photoGrid.addEventListener('click', function (event) {
  if (event.target.src.includes('LikeActive')) {
    event.target.src = "./images/Like.svg";
  } else if (event.target.src.includes('Like.svg')) {
    event.target.src = "./images/LikeActive.svg";
  }
})

