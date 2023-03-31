//find elements in DOM
let form = document.querySelector('.edit-form');
let nameInput = form.querySelector('.edit-form__input-name');
let aboutInput = form.querySelector('.edit-form__input-about');
let edit = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.edit-form__close');
let like = document.querySelectorAll('.photo-grid__like');

//like
like.forEach.call(like, function(el){
  el.addEventListener('click', e => {if (e.target.src.includes('LikeActive') == false) {
    e.target.src = "./images/LikeActive.svg";
  } else {
    e.target.src = "./images/Like.svg";
  }
});
});

// Open popup
edit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

// Close popup
close.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

//Submit
function handleFormSubmit(evt) {
  evt.preventDefault();
  // get aboutInput and nameInput from value prop.
  let name = nameInput.value;
  let about = aboutInput.value;
  // choose elements to change and change using textContent
  let nameOnPage = document.querySelector('.profile__name');
  let aboutOnPage = document.querySelector('.profile__about');
  nameOnPage.textContent = name;
  aboutOnPage.textContent = about;
}

// Submit listener
form.addEventListener('submit', handleFormSubmit); 