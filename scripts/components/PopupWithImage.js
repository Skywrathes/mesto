import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
  }

  open = (text, image) => {
    console.log(text);
    console.log(image);
    console.log(this._popupImage);console.log(this._popupImageTitle);
    this._popupImage.src = image;
    this._popupImage.alt = `${text} полноэкранное изображение`;
    this._popupImageTitle.textContent = text;
    super.open();
  }
}