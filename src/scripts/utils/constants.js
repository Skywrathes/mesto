const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit');

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
const popupDeleteCardSelector = '.popup_type_delete-card';
const popupAddAvatarSelector = '.popup_type_add-avatar';
const userData = {
  nameOnPage: '.profile__name',
  aboutOnPage: '.profile__about',
  avatar: '.profile__avatar'
}
const profilePopupSelector = '.popup_type_edit-profile';

export {
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
}