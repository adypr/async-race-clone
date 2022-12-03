import create from '../../base/utils';

export default class Popup {
  overlay: HTMLDivElement;

  button: HTMLDivElement;

  popupContent: HTMLDivElement;

  constructor() {
    this.overlay = create('div', 'overlay');
    this.button = create('div', 'popup__close');
    this.popupContent = create('div', 'popup__container');
  }

  renderPopup() {
    const popupContainer = create('div', 'popup');
    this.button.textContent = '✖';
    popupContainer.append(this.popupContent, this.button);
    this.overlay.append(popupContainer);
    return this.overlay;
  }
}
