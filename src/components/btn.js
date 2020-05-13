import AbstractComponent from './abstract-component';

const createBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class Btn extends AbstractComponent {
  getTemplate() {
    return createBtn();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
