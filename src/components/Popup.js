export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
  }

  _closePopupByEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleCloseButton = () => {
    this.close();
  }

  _handleBackgroundClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
      }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('mousedown', this._handleBackgroundClick)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupByEscape);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupByEscape);
  }
}