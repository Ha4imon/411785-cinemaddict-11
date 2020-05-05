import {createElement} from "../utils.js";

const createBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class Btn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
