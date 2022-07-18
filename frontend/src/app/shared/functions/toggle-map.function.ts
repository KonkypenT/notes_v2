export const showMap = (): void => {
  const element = document.querySelector('.modal-map') as HTMLElement;
  element.style.visibility = 'visible';
};

export const hideMap = (): void => {
  const element = document.querySelector('.modal-map') as HTMLElement;
  element.style.visibility = 'hidden';
};
