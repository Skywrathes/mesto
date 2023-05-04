const variables = {
  formSelector: '.edit__form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save',
  inactiveButtonClass: '.edit-form__save_type_inactive',
  inputErrorClass: '.edit-form__input-error',
  inputErrorClassActive: 'edit-form__input_type_error',
  errorMessageClass: '.edit-form__input-error_active',
}

//clear input from errors (put into popupOpen func)
function clearInputErrors(popupElement){
  const inputErrorList = popupElement.querySelectorAll('.edit-form__input-error');
  const inputList = Array.from(popupElement.querySelectorAll('.edit-form__input'));

  //delete underlining of input
  inputList.forEach(function(inputElement){
    inputElement.classList.remove('edit-form__input_type_error');
  })

  //delete error message
  inputErrorList.forEach(error => {
    error.classList.remove('edit-form__input-error_active');
  });
}


function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('edit-form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.remove('edit-form__input_type_error');
  errorElement.classList.remove('edit-form__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('edit-form__save_type_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('edit-form__save_type_inactive');
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'));
  const buttonElement = formElement.querySelector('.edit-form__save');

  // check btn state at the beginning
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // check btn state at the end
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.edit-form'));
  console.log(formList);
  formList.forEach(function (formElement) {
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  });
}

enableValidation(variables);

