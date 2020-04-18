import {createHeaderProfile} from './components/header-profile';
import {createMenu} from './components/menu';
import {createSort} from './components/sort';
import {createFilmsContainer} from './components/film-container';
import {createFilmTemplate} from './components/film-template';
import {createBtn} from './components/btn';
import {createFilmDetails} from './components/film-details';

const render = (container, el, place = `beforeend`) => {
  container.insertAdjacentHTML(place, el);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createHeaderProfile());
render(main, createMenu());
render(main, createSort());
render(main, createFilmsContainer());

const filmListContainer = document.querySelector(`.films-list`);
const filmListWrapper = filmListContainer.querySelector(`.films-list__container`);

const FILM_COUNT = 5;
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListWrapper, createFilmTemplate());
}

render(filmListContainer, createBtn());

const filmExtraListContainer = document.querySelectorAll(`.films-list--extra`);
const FILM_EXTRA_COUNT = 2;

filmExtraListContainer.forEach((container) => {
  const filmExtraListWrapper = container.querySelector(`.films-list__container`);
  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmExtraListWrapper, createFilmTemplate());
  }
});

render(document.body, createFilmDetails());
