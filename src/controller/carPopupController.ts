// import { renderCars } from '../builder';
import { addEvent } from '../components/base/utils';
import Car from '../components/blocks/car';
import CarPopup from '../components/blocks/popup/car';
import { updateCar } from './utils';
import Popup from '../components/blocks/popup';

const renderPopupController = (elem: Popup) => {
  addEvent(elem.button, 'click', () => {
    elem.overlay.remove();
    document.body.style.overflow = 'auto';
  });
};

export default renderPopupController;

const renderCarFormController = (elem: Car, popup: CarPopup) => {
  addEvent(popup.formButton, 'click', () => {
    const newName = popup.formText.value.length ? popup.formText.value : elem.name;
    const newColor = popup.formColor.value;
    (async () => {
      await updateCar(elem.id, newName, newColor);
    })().then(async () => { await elem.refreshCar(); })
      .catch(() => { console.log('Log popup.formButton'); });
  });
};

export { renderCarFormController };
