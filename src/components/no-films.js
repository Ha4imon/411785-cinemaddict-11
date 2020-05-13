import AbstractComponent from './abstract-component';

const createNoFilmsMessage = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  );
};

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsMessage(this._film);
  }
}
