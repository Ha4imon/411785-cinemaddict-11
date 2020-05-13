export const escKeyDownHandler = (callback, evt) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    callback();
  }
};
