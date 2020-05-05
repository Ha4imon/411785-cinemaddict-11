import {createElement} from "../utils.js";

const createCountFilm = (countFilms) => {
  return (
    `<p>${countFilms} movies inside</p>`
  );
};

export default class CountFilms {
  constructor(countFilms) {
    this._countFilms = countFilms;
    this._element = null;
  }

  getTemplate() {
    return createCountFilm(this._countFilms);
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

