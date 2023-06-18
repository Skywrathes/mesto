class Card {
  constructor(text, image, templateSelector, openFullscreen) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
    this._openFullscreen = openFullscreen;
  }


  //Create new card using template
  _getTemplate() {
    const newCard = document.querySelector(this._templateSelector).content.cloneNode(true);
    return newCard;
  }


  _likeCard() {
    this._likeBtn.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._closestCard.remove();
    this._element = null;
  }


  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._openFullscreen(this._text, this._image));
    this._cardDeleteBtn.addEventListener('click', () => this._deleteCard());
    this._likeBtn.addEventListener('click', () => this._likeCard());
  }


  generateCard() {
    //Find elements
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardText = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like');
    this._cardDeleteBtn = this._element.querySelector('.card__delete-icon');
    this._closestCard = this._cardDeleteBtn.closest('.card');

    //Set data
    this._cardImage.src = this._image;
    this._cardImage.alt = `${this._text} полноэкранное изображение`;
    this._cardText.textContent = this._text;

    //set all listeners
    this._setEventListeners();

    return this._element;
  }
}

export {Card};