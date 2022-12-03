import { NewCar } from '../types';
import { GLOBAL_PARAMS, pagesCount, createCar } from './utils';
import { addEvent, randomName, randomColor } from '../components/base/utils';
import garage from '../components/blocks/garage';
import pageBuilder, { renderCars } from '../builder';

const addGaragePaginationControl = () => {
  addEvent(garage.pagination.buttonNext, 'click', () => {
    (async () => {
      const pages = pagesCount(GLOBAL_PARAMS.totalCars, GLOBAL_PARAMS.carsPerPage);
      if (GLOBAL_PARAMS.currentGaragePage < pages) {
        garage.pagination.buttonPrev.disabled = false;
        GLOBAL_PARAMS.currentGaragePage += 1;
        garage.pagination.current.textContent = `${GLOBAL_PARAMS.currentGaragePage} / ${pagesCount(GLOBAL_PARAMS.totalCars, GLOBAL_PARAMS.carsPerPage)}`;
        await renderCars();
      }
      if (GLOBAL_PARAMS.currentGaragePage === pages) {
        garage.pagination.buttonNext.disabled = true;
      }
    })().catch(() => { console.log('Log garage.pagination.buttonNext'); });
  });

  addEvent(garage.pagination.buttonPrev, 'click', () => {
    (async () => {
      if (GLOBAL_PARAMS.currentGaragePage > 1) {
        garage.pagination.buttonNext.disabled = false;
        GLOBAL_PARAMS.currentGaragePage -= 1;
        garage.pagination.current.textContent = `${GLOBAL_PARAMS.currentGaragePage} / ${pagesCount(GLOBAL_PARAMS.totalCars, GLOBAL_PARAMS.carsPerPage)}`;
        await renderCars();
      }
      if (GLOBAL_PARAMS.currentGaragePage <= 1) {
        garage.pagination.buttonPrev.disabled = true;
      }
    })().catch(() => { console.log('Log garage.pagination.buttonPrev'); });
  });
};

const addGarageFormControl = () => {
  addEvent(garage.formButton, 'click', () => {
    (async () => {
      const newCar: NewCar = {
        name: garage.formText.value || randomName(),
        color: garage.formColor.value,
      };
      await createCar(newCar).then(async () => {
        await pageBuilder();
      });
    })().catch(() => { console.log('Log garage.formButton'); });
  });

  addEvent(garage.generateCarsButton, 'click', () => {
    (async () => {
      const promises = [];
      for (let i = 1; i <= GLOBAL_PARAMS.generateCarsCount; i += 1) {
        const newCar: NewCar = {
          name: randomName(),
          color: randomColor(),
        };
        const res = createCar(newCar);
        promises.push(res);
      }
      await Promise.all(promises).then(async () => {
        await pageBuilder();
      });
    })().catch(() => { console.log('Log garage.generateCarsButton'); });
  });
};

const renderGarageControl = () => {
  addGarageFormControl();
  addGaragePaginationControl();
};

export default renderGarageControl;
