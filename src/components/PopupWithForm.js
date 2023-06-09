import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.edit-form');
    this._inputList = this._form.querySelectorAll('.edit-form__input');
    this._submitButton = this._form.querySelector('.edit-form__save');
    this._initialSumbitButtonText = this._submitButton.textContent;
  }

  _getInputsValue = () => {
    this._inputsValue = {};
    //create prop with key taken from input name (inputElement.name) and value taken from input value
    this._inputList.forEach(inputElement => {
      this._inputsValue[inputElement.name] = inputElement.value;
    });
    return this._inputsValue;
  }

  setInputsValue(userData) {
    this._inputList.forEach(inputElement => {
      //set inputs data after opening (use name attr)
      inputElement.value = userData[inputElement.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInitialText() {
    this._submitButton.textContent = this._initialSumbitButtonText;
  }

  setEventListeners = () => {
    super.setEventListeners();
    
    //submit listener for bouth forms (common part)
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submitFunction(this._getInputsValue());
    });
  }
}