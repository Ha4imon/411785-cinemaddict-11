import {render, RenderPosition} from "../untils/render";
import {escKeyDownHandler} from '../untils/common';
import FilmDetailsCompinent from '../components/film-details';
import NoFilmsComponent from "../components/no-films.js";
import FilmContainerComponent from '../components/film-container';
import FilmComponent from '../components/film-template';
import BtnComponent from '../components/btn';

export default class PageController {
  constructor(container) {
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmContainerComponent = new FilmContainerComponent();
    this._btnComponent = new BtnComponent();
    this._container = container;
  }

  renderFilmTemplate(start, count, arr, container) {
    for (let i = start; i < start + count; i++) {
      if (i >= arr.length) {
        break;
      }

      const some = function (evt) {
        escKeyDownHandler(popupHideHandler, evt);
      };

      const popupHideHandler = () => {
        filmDetailComponent.removeElement();
        document.removeEventListener(`keydown`, some);
      };

      const popupShowHandler = () => {
        render(document.body, filmDetailComponent.getElement(), RenderPosition.BEFOREEND);
        const btnClose = filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

        btnClose.addEventListener(`click`, popupHideHandler);
        document.addEventListener(`keydown`, some);
      };

      const filmComponent = new FilmComponent(arr[i]);
      const filmDetailComponent = new FilmDetailsCompinent(arr[i]);

      const posterFilm = filmComponent.getElement().querySelector(`.film-card__poster`);
      const titleFilm = filmComponent.getElement().querySelector(`.film-card__title`);
      const commentFilm = filmComponent.getElement().querySelector(`.film-card__comments`);

      filmComponent.setClickHandler(posterFilm, popupShowHandler);
      filmComponent.setClickHandler(titleFilm, popupShowHandler);
      filmComponent.setClickHandler(commentFilm, popupShowHandler);

      render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  renderFilmsBoard(films) {
    if (!films.length) {
      render(this._container, this._noFilmsComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }
    render(this._container, this._filmContainerComponent.getElement(), RenderPosition.BEFOREEND);
    const filmListContainer = document.querySelector(`.films-list`);
    const filmListWrapper = filmListContainer.querySelector(`.films-list__container`);

    const FILM_COUNT_RENDER = 5;
    let startRenderFilm = 0;

    this.renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
    startRenderFilm += FILM_COUNT_RENDER;

    render(filmListContainer, this._btnComponent.getElement(), RenderPosition.BEFOREEND);

    const filmExtraListContainer = document.querySelectorAll(`.films-list--extra`);
    const FILM_EXTRA_COUNT = 2;
    const START_FILM_EXTRA_COUNT = 0;

    filmExtraListContainer.forEach((container) => {
      const filmExtraListWrapper = container.querySelector(`.films-list__container`);
      this.renderFilmTemplate(START_FILM_EXTRA_COUNT, FILM_EXTRA_COUNT, films, filmExtraListWrapper);
    });

    this._btnComponent.setClickHandler(() => {
      this.renderFilmTemplate(startRenderFilm, FILM_COUNT_RENDER, films, filmListWrapper);
      startRenderFilm += FILM_COUNT_RENDER;

      if (startRenderFilm >= films.length) {
        this._btnComponent.removeElement();
      }
    });
  }
}
