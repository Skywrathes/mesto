export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
  }

  //Private method to check if res ok or not
  _checkRes(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkRes)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkRes)
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',

      headers: this._headers,

      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    
    })
    .then(this._checkRes)
  }

  editAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',

      headers: this._headers,

      body: JSON.stringify({
        avatar: userData.avatar,
      })
    
    })
    .then(this._checkRes)
  }

  
  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',

      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    
    })
    .then(this._checkRes)
  }
  // Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',

      headers: {
        authorization: this._authorization,
      },
    
    })
    .then(this._checkRes)
  }

  addLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',

      headers: {
        authorization: this._authorization,
      },
    
    })
    .then(this._checkRes)
  }

  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',

      headers: {
        authorization: this._authorization,
      },
    
    })
    .then(this._checkRes)
  }

}

