import { addEvent } from '../components/base/utils';
import Car from '../components/blocks/car';
import garage from '../components/blocks/garage';
import CarPopup from '../components/blocks/popup/car';
import renderPopupController, { renderCarFormController } from './carPopupController';
import getResponse, {
  deleteCar,
  GLOBAL_PARAMS,
  path,
  defineParams,
  switchEngine,
  switchDrive,
  RACE_PARAMS,
  changeWinner,
} from './utils';
import { ServerCar } from '../types';
import footer from '../components/blocks/footer';
import main from '../components/blocks/main';
import control from '../components/blocks/control';
import header from '../components/blocks/header';
import raceControl from './race-controller';
import WinnerPopup from '../components/blocks/popup/winner';
import sendWinner from './send-winner';

const updatePosition = (elem: Car) => {
  elem.car.setAttribute('style', `transform: translate(${elem.position}px)`);
};

let animationId: number | undefined;

const addButtonBackController = (elem: Car) => {
  addEvent(elem.buttonBack, 'click', () => {
    cancelAnimationFrame(animationId as number);
    RACE_PARAMS.raceState = 'off';
    elem.back();
    updatePosition(elem);
    elem.buttonBack.setAttribute('disabled', 'true');
    elem.buttonMove.removeAttribute('disabled');
  });
};

const renderAnimation = (elem: Car, duration: number) => {
  let currentX = elem.car.offsetLeft;
  const endX = Math.ceil(elem.carTrack.getBoundingClientRect().width);

  const animation = () => {
    const framesCount = (duration / 1000) * 60;
    const dx = (endX - currentX) / framesCount;

    const tick = () => {
      currentX += dx;
      elem.car.setAttribute('style', `transform: translate(${currentX}px)`);

      if (currentX < endX) {
        animationId = requestAnimationFrame(tick);
      }
    };

    tick();
  };
  animation();
};

const moveCarController = (elem: Car) => {
  addEvent(elem.buttonMove, 'click', () => {
    elem.buttonBack.click();
    elem.buttonMove.setAttribute('disabled', 'true');
    elem.buttonBack.removeAttribute('disabled');
    (async () => {
      const response = await switchEngine(elem.id, 'started');
      return response;
    })().then(async (data) => {
      const duration = data.distance / data.velocity;

      renderAnimation(elem, duration);

      try {
        await switchDrive(elem.id, 'drive');
        RACE_PARAMS.currentRacers.set(elem.id, duration);
      } catch (e) {
        cancelAnimationFrame(animationId as number);
        RACE_PARAMS.currentRacers.set(elem.id, null);
        elem.buttonBack.removeAttribute('disabled');
      }
      return duration;
    }).then((duration) => {
      setTimeout(() => {}, duration);
      return duration;
    })
      .then(async (duration) => {
        if (RACE_PARAMS.raceState === 'on' && RACE_PARAMS.currentRacers.get(elem.id) !== null) {
          RACE_PARAMS.raceState = 'off';
          const winnerPopup = new WinnerPopup();
          document.body.append(winnerPopup.renderWinnerPopup(elem));
          renderPopupController(winnerPopup);
          await sendWinner(elem, Math.round(duration) / 1000);
        }
      })
      .catch((e) => console.log('Log animation', e));
  });
  addButtonBackController(elem);
};

const renderCarControl = (elem: Car) => {
  moveCarController(elem);

  addEvent(elem.buttonEdit, 'click', () => {
    const popup = new CarPopup();
    popup.formColor.value = elem.color;
    document.body.append(popup.renderCarPopup());
    document.body.style.overflow = 'hidden';
    renderPopupController(popup);
    renderCarFormController(elem, popup);
  });

  addEvent(elem.buttonDelete, 'click', () => {
    (async () => {
      await deleteCar(elem.id);
    })().then(async () => {
      await changeWinner({ id: elem.id, wins: 0, time: 0 }, 'delete');

      garage.cars.innerHTML = '';
      const params = defineParams(GLOBAL_PARAMS.currentGaragePage, GLOBAL_PARAMS.carsPerPage);
      const carsArr = await getResponse(path.garage, params) as ServerCar[];
      garage.carsNumber = GLOBAL_PARAMS.totalCars;
      RACE_PARAMS.currentRacers = new Map();
      carsArr.forEach((obj: ServerCar) => {
        RACE_PARAMS.currentRacers.set(obj.id, null);
        const carInstance = new Car(obj);
        renderCarControl(carInstance);
        garage.cars.append(carInstance.renderCar());
      });
    }).then(() => {
      main.mainContainer.innerHTML = '';
      main.mainContainer.append(control.renderControl(), garage.renderGarage());
      document.body.innerHTML = '';
      document.body.append(header.renderHeader(), main.renderMain());
      footer(document.body);
      raceControl();
    })
      .catch(() => { console.log('Log buttonDelete'); });
  });
};

export default renderCarControl;
