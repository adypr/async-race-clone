import create from '../../base/utils';
import { ServerCar } from '../../../types';
import getResponse, { path } from '../../../controller/utils';

export default class Car {
  id: number;

  name: string;

  color: string;

  buttonMove: HTMLButtonElement;

  buttonBack: HTMLButtonElement;

  buttonEdit: HTMLButtonElement;

  buttonDelete: HTMLButtonElement;

  carTrack: HTMLDivElement;

  car: HTMLDivElement;

  position: number;

  title: HTMLHeadElement;

  constructor(obj: ServerCar) {
    this.name = obj.name;
    this.color = obj.color;
    this.id = obj.id;
    this.buttonMove = create('button', 'car__move');
    this.buttonBack = create('button', 'car__back');
    this.buttonEdit = create('button', 'car__edit');
    this.buttonDelete = create('button', 'car__delete');
    this.carTrack = create('div', 'car__track');
    this.car = create('div', 'car__body');
    this.position = 0;
    this.title = create('h4', 'car__title');
  }

  renderCar() {
    const carContainer = create('div', 'car');

    const control = create('div', 'car__control');
    this.buttonMove.textContent = 'Move';
    this.buttonBack.disabled = true;
    this.buttonBack.textContent = 'Back to start';
    this.title.textContent = this.name;
    this.buttonEdit.textContent = 'Edit';
    this.buttonDelete.textContent = 'Delete';
    control.append(
      this.buttonMove,
      this.buttonBack,
      this.title,
      this.buttonEdit,
      this.buttonDelete,
    );

    const carRoad = create('div', 'car__container');
    carRoad.id = String(this.id);

    const carFinish = `<div class="car__finish">
                                <svg class="car__flag" width="50" height="35">
                                    <use xlink:href="./assets/icons/sprite.svg#flag"></use>
                                </svg>
                            </div>`;
    this.renderCarBody(this.carTrack);
    carRoad.append(this.carTrack);
    carRoad.insertAdjacentHTML('beforeend', carFinish);

    carContainer.append(control, carRoad);

    return carContainer;
  }

  renderCarBody(container: HTMLDivElement) {
    const carContent = `<svg class="car__img" width="100" height="35" fill="${this.color}">
                            <use xlink:href="./assets/icons/sprite.svg#car"></use>
                        </svg>`;
    this.car.insertAdjacentHTML('afterbegin', carContent);
    container.append(this.car);
  }

  async refreshCar() {
    const car = await getResponse(path.garage, this.id) as ServerCar;
    this.name = car.name;
    this.title.textContent = this.name;
    this.color = car.color;
    this.car.innerHTML = '';
    this.carTrack.innerHTML = '';
    this.renderCarBody(this.carTrack);
  }

  move() {
    this.position += 10;
  }

  back() {
    this.position = 0;
  }

  setCarProperties(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  cleanTrack() {
    this.car.innerHTML = '';
  }
}
