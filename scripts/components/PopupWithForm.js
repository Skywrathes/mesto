import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.edit-form');
    this._inputList = this._form.querySelectorAll('.edit-form__input');
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
      inputElement.value = userData[inputElement.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFunction(this._getInputsValue());
    });
  }
}