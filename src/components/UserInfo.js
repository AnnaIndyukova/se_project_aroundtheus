export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatarLink: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._occupation.textContent = about;
    this._avatar.src = avatar;
  }
}
