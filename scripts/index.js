//find elements in DOM
let form = document.querySelector('.edit-form');
let nameInput = form.querySelector('.edit-form__input_profile_name');
let aboutInput = form.querySelector('.edit-form__input_profile_about');
let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let nameOnPage = document.querySelector('.profile__name');
let aboutOnPage = document.querySelector('.profile__about');

//Popup open func with getting the text content from page
let popupOpen = function() {
  popup.classList.add('popup_opened');
  nameInput.value = nameOnPage.textContent;
  aboutInput.value = aboutOnPage.textContent;
}

//Popup close func
let popupClose = function() {
  popup.classList.remove('popup_opened');
}

// Open popup
edit.addEventListener('click', popupOpen);

// Close popup
close.addEventListener('click', popupClose);

//Submit
function handleFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  let name = nameInput.value;
  let about = aboutInput.value;
  // choose elements to change and change them using textContent
  nameOnPage.textContent = name;
  aboutOnPage.textContent = about;
  popupClose();
}

// Submit listener
form.addEventListener('submit', handleFormSubmit); 


// let like = document.querySelectorAll('.card__like');
// //like
// like.forEach.call(like, function(el){
//   el.addEventListener('click', e => {if (e.target.src.includes('LikeActive') == false) {
//     e.target.src = "./images/LikeActive.svg";
//   } else {
//     e.target.src = "./images/Like.svg";
//   }
// });
// });