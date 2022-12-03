import header from './components/blocks/header';
import main from './components/blocks/main';
import control from './components/blocks/control';
import garage from './components/blocks/garage';
import Car from './components/blocks/car';
import footer from './components/blocks/footer';
import renderCarControl from './controller/car-controller';
import { ServerCar } from './types';
import getResponse, {
  RACE_PARAMS,
  defineParams,
  GLOBAL_PARAMS,
  path,
} from './controller/utils';
import raceControl from './controller/race-controller';

export const renderCars = async () => {
  garage.cars.innerHTML = '';
  RACE_PARAMS.currentRacers = new Map();
  const params = defineParams(GLOBAL_PARAMS.currentGaragePage, GLOBAL_PARAMS.carsPerPage);
  const carsArr = await getResponse(path.garage, params) as ServerCar[];
  garage.carsNumber = GLOBAL_PARAMS.totalCars;
  carsArr.forEach((obj: ServerCar) => {
    RACE_PARAMS.currentRacers.set(obj.id, null);
    const carInstance = new Car(obj);
    renderCarControl(carInstance);
    garage.cars.append(carInstance.renderCar());
  });
  raceControl();
};

const pageBuilder = async () => {
  await renderCars();
  main.mainContainer.innerHTML = '';
  main.mainContainer.append(control.renderControl(), garage.renderGarage());
  document.body.innerHTML = '';
  document.body.append(header.renderHeader(), main.renderMain());
  footer(document.body);
};

export default pageBuilder;
