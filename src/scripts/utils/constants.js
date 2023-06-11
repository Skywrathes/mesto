const initialCards = [
  {
    text: 'Кострома',
    image: 'https://sun9-68.userapi.com/impg/j5T-Vj1EVbMD0ZibDKdDvmswZnPenlCyX7-jrw/3ke7LpeuOmQ.jpg?size=1280x1280&quality=95&sign=cb18327bdd730db3184102ecb891fd84&type=album'
  },
  {
    text: 'Карелия',
    image: 'https://sun9-48.userapi.com/impg/0Q_av0uZv_nLVq_p15WxThOfhyugfHL04VGO7g/Ti8MsoU7vBw.jpg?size=1280x960&quality=95&sign=0dd8e46be5de85f3f1148873a1edb48f&type=album'
  },
  {
    text: 'Иваново',
    image: 'https://sun9-75.userapi.com/impg/EkMrD4xOZvTFISnBMXggAwiJJOiVYkKAD_EPZQ/9kyQsKo0lz0.jpg?size=1280x718&quality=95&sign=500af6c62cf8e50e7e2a1da24e1ac432&type=album'
  },
  {
    text: 'Санкт-Петербург',
    image: 'https://sun9-75.userapi.com/impg/yxMRwCYaZguiAb3G0Nu6Nz5oP-ZDd4D_BbD15g/gCNGqJLNdWc.jpg?size=1280x720&quality=96&sign=b331cc9cf4d5a9cd97ed628a48aff0e7&type=album'
  },
  {
    text: 'Пушкин',
    image: 'https://sun9-35.userapi.com/impg/2xF3JH90p5n5eIciX-sHYqhoj1SMhoU65lMVHg/0fGsFfcBJMY.jpg?size=1280x1280&quality=95&sign=f9680ac8b586e8083357329aa8d176c6&type=album'
  },
  {
    text: 'Плёс',
    image: 'https://sun9-4.userapi.com/impg/hfCnRKRMNqWVoCvPTqgzFtdU74yTNbERBm14Bg/IGLonkoqFMI.jpg?size=1080x810&quality=96&sign=0445fd120bf6a595979fe3b60da6a172&type=album'
  }
];

const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save',
  inactiveButtonClass: 'edit-form__save_type_inactive',
  inputErrorClass: '.edit-form__input-error',
  inputErrorClassActive: 'edit-form__input_type-error',
  errorMessageClass: 'edit-form__input-error_active',
};
const profileForm = document.forms['profile-form'];
const addCardForm = document.forms['addCard-form'];
const formsToValidate = {profileForm, addCardForm};

const popupShowImageSelector = '.popup_type_show-image';
const cardContainerSelector = '.photo-grid';
const popupAddCardSelector = '.popup_type_add-card';
const userData = {
  nameOnPage: '.profile__name',
  aboutOnPage: '.profile__about',
}
const profilePopupSelector = '.popup_type_edit-profile';

export {
  initialCards,
  addCardButton,
  editButton,
  validationConfig,
  formsToValidate,
  popupShowImageSelector,
  cardContainerSelector,
  popupAddCardSelector,
  userData,
  profilePopupSelector
}