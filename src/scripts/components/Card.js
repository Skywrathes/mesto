class Card {
  constructor(cardData, templateSelector, openFullscreen, openDeletePopup, toggleLike) {
    this._text = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._openFullscreen = openFullscreen;
    //Find elements
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardText = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like');
    this._cardDeleteBtn = this._element.querySelector('.card__delete-icon');
    // this._closestCard = this._cardDeleteBtn.closest('.card');
    this._counter = this._element.querySelector('.card__like-number')

    this._ownerId = cardData.owner._id;
    this._myId = cardData.id;
    this._likes = cardData.likes;
    this._likesNumber = cardData.likes.length;
    this._cardId = cardData._id;
    this._toggleLike = toggleLike;
    this._openDeletePopup = openDeletePopup;
  }


  //Find card DOMElement
  _getTemplate() {
    const newCard = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return newCard;
  }


  likeCard(likes) {
    this._likeBtn.classList.toggle("card__like_active");
    this._counter.textContent = likes.length;
  }

  _toggleLikeFunc() {
    //use callback (send it to the generateNewCard)
    this._toggleLike(this._likeBtn, this._cardId)
  }
  


  _getLikes() {
    this._likes.forEach((user) => {
      if (user._id === this._myId) {
        console.log(this._myId);
        this._likeBtn.classList.add("card__like_active");
      }
    })
  
    this._counter.textContent = this._likesNumber;
  }

  deleteCardFromDom = () => {
    this._element.remove();
    this._element = null;
  }

  _deleteCardFromServer = () => {
    this._openDeletePopup(this, this._cardId);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._openFullscreen(this._text, this._image));
    this._cardDeleteBtn.addEventListener('click', () => this._deleteCardFromServer());
    this._likeBtn.addEventListener('click', () => this._toggleLikeFunc());
  }


  generateCard() {
    this._getLikes();
    
    //Set data
    this._cardImage.src = this._image;
    this._cardImage.alt = `${this._text} полноэкранное изображение`;
    this._cardText.textContent = this._text;

    //check owner
    if (this._ownerId !== this._myId) {
      this._cardDeleteBtn.remove()
    }

    //set all listeners
    this._setEventListeners();

    return this._element;
  }
}

export {Card};