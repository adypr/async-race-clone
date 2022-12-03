import Popup from '.';
import create from '../../base/utils';

export default class CarPopup extends Popup {
  form: HTMLDivElement;

  formText: HTMLInputElement;

  formColor: HTMLInputElement;

  formButton: HTMLInputElement;

  constructor() {
    super();
    this.form = create('div', 'popup__form');
    this.formText = create('input', 'new-car__title');
    this.formColor = create('input', 'new-car__color');
    this.formButton = create('input', 'new-car__create');
  }

  renderCarPopup() {
    this.formText.type = 'text';
    this.formText.placeholder = 'New name';
    this.formColor.type = 'color';
    this.formButton.type = 'submit';
    this.formButton.value = 'Submit';
    this.form.append(this.formText, this.formColor, this.formButton);

    this.popupContent.append(this.form);
    return this.renderPopup();
  }
}
