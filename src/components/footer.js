import AbstractComponent from './abstract-component';

const createCountFilm = (countFilms) => {
  return (
    `<p>${countFilms} movies inside</p>`
  );
};

export default class CountFilms extends AbstractComponent {
  constructor(countFilms) {
    super();
    this._countFilms = countFilms;
  }

  getTemplate() {
    return createCountFilm(this._countFilms);
  }
}

