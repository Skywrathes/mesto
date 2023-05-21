export class FormValidator {
  constructor (validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClassActive);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorMessageClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClassActive);
    errorElement.classList.remove(this._validationConfig.errorMessageClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }


  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }


  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    //change this to save context in the listener
    const self = this;
    // check btn state at the beginning
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        self._checkInputValidity(inputElement);
        // check btn state at the end
        self._toggleButtonState(inputList, buttonElement); 
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}