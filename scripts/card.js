class Card {
  constructor(text, image, templateSelector) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
  }


  //Create new card using template
  _getTemplate() {
    const newCard = document.querySelector(this._templateSelector).content.cloneNode(true);
  
    return newCard;
  }

  //set listener to like card
  _setLikeEventListener(newCard) {
    const likeBtn = newCard.querySelector('.card__like');
    likeBtn.addEventListener('click', function(){
      if (likeBtn.src.includes('LikeActive')) {
        likeBtn.src = "./images/Like.svg";
      } else if (likeBtn.src.includes('Like.svg')) {
        likeBtn.src = "./images/LikeActive.svg";
      }
    })
  }
  
    //set listener to delete card
    _setDeleteEventListener(newCard) {
    const cardDeleteBtn = newCard.querySelector('.card__delete-icon');
    cardDeleteBtn.addEventListener('click', function(){
      const closestCard = cardDeleteBtn.closest('.card');
      closestCard.remove();
    })
  }

//публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._element = this._getTemplate();

    //Like listener
    this._setLikeEventListener(this._element);
    
    //Delete listener
    this._setDeleteEventListener(this._element);
    
    //Set data
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._text;
    this._element.querySelector('.card__title').textContent = this._text;

    return this._element;
  }
}

export {Card};