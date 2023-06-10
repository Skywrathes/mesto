export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.nameOnPage);
    this._about = document.querySelector(userData.aboutOnPage);
  }

  getUserInfo() {
    return {
      //name and about as in html input name
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  //return data
  setUserInfo (userDataInput) {
    //name and about as in html input name
    this._name.textContent = userDataInput.name;
    this._about.textContent = userDataInput.about;
  }
}