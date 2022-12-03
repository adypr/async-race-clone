import Popup from '.';
import create from '../../base/utils';
import Car from '../car';

export default class WinnerPopup extends Popup {
  renderWinnerPopup(elem: Car) {
    const message = create('h2');
    message.textContent = `Winner is ${elem.name}!`;

    this.popupContent.append(message);
    return this.renderPopup();
  }
}
