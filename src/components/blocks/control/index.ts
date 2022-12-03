import create from '../../base/utils';

const controlButtons: Array<keyof Control> = ['race', 'reset'];

class Control {
  race: HTMLButtonElement;

  reset: HTMLButtonElement;

  constructor() {
    this.race = create('button', 'control__button', 'race');
    this.reset = create('button', 'control__button', 'reset');
  }

  renderControl() {
    const controlContainer = create('div', 'control');
    controlButtons.forEach((item) => {
      (this[item] as HTMLButtonElement).textContent = item;
      controlContainer.append(this[item] as HTMLButtonElement);
    });
    return controlContainer;
  }
}

export default new Control();
