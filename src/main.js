import HeaderComponent from './components/header-profile';
import MenuComponent from './components/menu';
import SortComponent from './components/sort';
import CountFilmsComponent from './components/footer';
import PageController from './controllers/page-controller';
import {getFilms} from './mock/films';
import {getUser} from './mock/user';
import {render, RenderPosition} from "./untils/render";

const header = document.querySelector(`.header`);
const user = getUser();
render(header, new HeaderComponent(user).getElement(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
const films = getFilms();

render(main, new MenuComponent(films).getElement(), RenderPosition.BEFOREEND);
render(main, new SortComponent().getElement(), RenderPosition.BEFOREEND);
new PageController(main).renderFilmsBoard(films);

const footerContainer = document.querySelector(`.footer__statistics`);

render(footerContainer, new CountFilmsComponent(films.length).getElement(), RenderPosition.BEFOREEND);
