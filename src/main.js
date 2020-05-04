import {createHeaderProfile} from './components/header-profile';
import {createMenu} from './components/menu';
import {createSort} from './components/sort';
import {createFilmsContainer} from './components/film-container';
import {createFilmTemplate} from './components/film-template';
import {createBtn} from './components/btn';
import {createCountFilm} from './components/footer';
import {createFilmDetails} from './components/film-details';
import {getFilms} from './mock/films';
import {getUser} from './mock/user';

const render = (container, el, place = `beforeend`) => {
  container.insertAdjacentHTML(place, el);
};

const renderFilmTemplate = (start, count, arr, container) => {
  for (let i = start; i < start + count; i++) {
    if (i >= arr.length) {
      break;
    }
    render(container, createFilmTemplate(arr[i]));
  }
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const user = getUser();
const films = getFilms();
const watchlistFilms = films.filter((film) => {
  return film.userInfo.watchlist;
});
const watchedFilms = films.filter((film) => {
  return film.userInfo.watched;
});
const favoritesFilms = films.filter((film) => {
  return film.userInfo.favorites;
});

render(header, createHeaderProfile(user));
render(main, createMenu(watchlistFilms.length, watchedFilms.length, favoritesFilms.length));
render(main, createSort());
render(main, createFilmsContainer());

const filmListContainer = document.querySelector(`.films-list`);
const filmListWrapper = filmListContainer.querySelector(`.films-list__container`);

const FILM_COUNT_RENDER = 5;
let startRenderFilm = 0;

renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
startRenderFilm += FILM_COUNT_RENDER;

render(filmListContainer, createBtn());

const filmExtraListContainer = document.querySelectorAll(`.films-list--extra`);
const FILM_EXTRA_COUNT = 2;
const START_FILM_EXTRA_COUNT = 0;

filmExtraListContainer.forEach((container) => {
  const filmExtraListWrapper = container.querySelector(`.films-list__container`);
  renderFilmTemplate(START_FILM_EXTRA_COUNT, FILM_EXTRA_COUNT, films, filmExtraListWrapper);
});

const footerContainer = document.querySelector(`.footer__statistics`);

render(footerContainer, createCountFilm(films.length));

// render(document.body, createFilmDetails(films[0]));

const loadMoreFilmBtn = filmListContainer.querySelector(`.films-list__show-more`);

loadMoreFilmBtn.addEventListener(`click`, function () {
  renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
  startRenderFilm += FILM_COUNT_RENDER;

  if (startRenderFilm >= films.length) {
    loadMoreFilmBtn.remove();
  }
});
