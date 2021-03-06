import AbstractComponent from './abstract-component';

const createHeaderProfile = (user) => {
  const {rank} = user;

  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${rank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Header extends AbstractComponent {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createHeaderProfile(this._user);
  }
}
