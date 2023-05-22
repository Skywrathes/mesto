export class FormValidator {
  constructor (validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._validationConfig.inputErrorClassActive);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorMessageClass);
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._validationConfig.inputErrorClassActive);
    errorElement.classList.remove(this._validationConfig.errorMessageClass);
    errorElement.textContent = '';
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }


  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }


  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
  }


  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);


    // check btn state at the beginning
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        // check btn state at the end
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}