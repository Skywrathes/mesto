

function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClassActive);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorMessageClass);
}

function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.remove(obj.inputErrorClassActive);
  errorElement.classList.remove(obj.errorMessageClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  // check btn state at the beginning
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      // check btn state at the end
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  console.log(formList);
  formList.forEach(function (formElement) {
    formList.forEach((formElement) => {
      setEventListeners(formElement, obj);
    });
  });
}

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save',
  inactiveButtonClass: 'edit-form__save_type_inactive',
  inputErrorClass: '.edit-form__input-error',
  inputErrorClassActive: 'edit-form__input_type_error',
  errorMessageClass: 'edit-form__input-error_active',
});

