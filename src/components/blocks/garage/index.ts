import create from '../../base/utils';
import Pagination from '../pagination';
import { GLOBAL_PARAMS } from '../../../controller/utils';

class Garage {
  carsNumber: number;

  generateCarsButton: HTMLButtonElement;

  form: HTMLDivElement;

  formText: HTMLInputElement;

  formColor: HTMLInputElement;

  formButton: HTMLInputElement;

  cars: HTMLDivElement;

  pagination: Pagination;

  constructor() {
    this.carsNumber = GLOBAL_PARAMS.totalCars;
    this.generateCarsButton = create('button', 'garage__generate');
    this.form = create('div', 'new-car');
    this.formText = create('input', 'new-car__title');
    this.formColor = create('input', 'new-car__color');
    this.formButton = create('input', 'new-car__create');
    this.cars = create('div', 'garage__cars');
    this.pagination = new Pagination();
  }

  renderGarage() {
    const garageContainer = create('div', 'garage');
    const title = '<h2 class="garage__title">Garage</h2>';
    garageContainer.insertAdjacentHTML('afterbegin', title);

    const control = create('div', 'garage__control');
    const controlTitle = create('h3', 'garage__count');
    controlTitle.textContent = `Cars in garage: ${this.carsNumber}`;
    this.generateCarsButton.textContent = 'Generate cars';
    control.append(controlTitle, this.generateCarsButton);

    this.formText.type = 'text';
    this.formText.placeholder = 'Model of new car';
    this.formColor.type = 'color';
    this.formButton.type = 'submit';
    this.formButton.value = 'Create';
    this.form.append(this.formText, this.formColor, this.formButton);

    garageContainer.append(
      control,
      this.form,
      this.cars,
      this.pagination.renderPagination('garage'),
    );

    return garageContainer;
  }
}

export default new Garage();
