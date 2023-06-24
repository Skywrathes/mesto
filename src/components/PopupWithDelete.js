import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.edit-form');
    this._submitButton = this._form.querySelector('.edit-form__save');
    this._initialSumbitButtonText = this._submitButton.textContent;
  }

  open = (cardElement, cardId) => {
    super.open();
    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  setInitialText() {
    this._submitButton.textContent = this._initialSumbitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submitFunction(this._cardElement, this._cardId);
      this.close()
    })
  }

}