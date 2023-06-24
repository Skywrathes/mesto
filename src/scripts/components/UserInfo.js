export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.nameOnPage);
    this._about = document.querySelector(userData.aboutOnPage);
    this._avatar = document.querySelector(userData.avatar);
  }

  getUserInfo() {
    return {
      //name and about as in html input name
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  //return data
  setUserInfo ({name, about, avatar}) {
    //name, avatar and about as in html input name
    this._avatar.src = avatar;
    this._name.textContent = name;
    this._about.textContent = about;
  }
}