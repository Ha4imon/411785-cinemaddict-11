import HeaderComponent from './components/header-profile';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import FilmContainerComponent from './components/film-container';
import FilmComponent from './components/film-template';
import BtnComponent from './components/btn';
import CountFilmsComponent from './components/footer';
import FilmDetailsCompinent from './components/film-details';
import NoFilmsComponent from "./components/no-films.js";
import {getFilms} from './mock/films';
import {getUser} from './mock/user';
import {render, RenderPosition} from "./utils";

const renderFilmTemplate = (start, count, arr, container) => {
  for (let i = start; i < start + count; i++) {
    if (i >= arr.length) {
      break;
    }

    const popupHideHandler = () => {
      document.body.removeChild(filmDetailComponent);
    };

    const escKeyDownHandler = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        popupHideHandler();
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    const popupShowHandler = () => {
      render(document.body, filmDetailComponent, RenderPosition.BEFOREEND);
      const btnClose = filmDetailComponent.querySelector(`.film-details__close-btn`);

      btnClose.addEventListener(`click`, popupHideHandler);
      document.addEventListener(`keydown`, escKeyDownHandler);
    };

    const filmComponent = new FilmComponent(arr[i]).getElement();
    const filmDetailComponent = new FilmDetailsCompinent(arr[i]).getElement();

    const posterFilm = filmComponent.querySelector(`.film-card__poster`);
    const titleFilm = filmComponent.querySelector(`.film-card__title`);
    const commentFilm = filmComponent.querySelector(`.film-card__comments`);

    posterFilm.addEventListener(`click`, popupShowHandler);
    titleFilm.addEventListener(`click`, popupShowHandler);
    commentFilm.addEventListener(`click`, popupShowHandler);

    render(container, filmComponent, RenderPosition.BEFOREEND);
  }
};

const renderFilmsBoard = () => {
  if (!films.length) {
    render(main, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(main, new FilmContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const filmListContainer = document.querySelector(`.films-list`);
  const filmListWrapper = filmListContainer.querySelector(`.films-list__container`);

  const FILM_COUNT_RENDER = 5;
  let startRenderFilm = 0;

  renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
  startRenderFilm += FILM_COUNT_RENDER;

  render(filmListContainer, new BtnComponent().getElement(), RenderPosition.BEFOREEND);

  const filmExtraListContainer = document.querySelectorAll(`.films-list--extra`);
  const FILM_EXTRA_COUNT = 2;
  const START_FILM_EXTRA_COUNT = 0;


  filmExtraListContainer.forEach((container) => {
    const filmExtraListWrapper = container.querySelector(`.films-list__container`);
    renderFilmTemplate(START_FILM_EXTRA_COUNT, FILM_EXTRA_COUNT, films, filmExtraListWrapper);
  });

  const loadMoreFilmBtn = filmListContainer.querySelector(`.films-list__show-more`);

  loadMoreFilmBtn.addEventListener(`click`, function () {
    renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
    startRenderFilm += FILM_COUNT_RENDER;

    if (startRenderFilm >= films.length) {
      loadMoreFilmBtn.remove();
    }
  });
};

const header = document.querySelector(`.header`);
const user = getUser();
render(header, new HeaderComponent(user).getElement(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
const films = getFilms();

render(main, new MenuComponent(films).getElement(), RenderPosition.BEFOREEND);
render(main, new SortComponent().getElement(), RenderPosition.BEFOREEND);

renderFilmsBoard();

const footerContainer = document.querySelector(`.footer__statistics`);

render(footerContainer, new CountFilmsComponent(films.length).getElement(), RenderPosition.BEFOREEND);
