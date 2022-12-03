import create from '../../base/utils';

class Main {
  mainContainer: HTMLDivElement;

  constructor() {
    this.mainContainer = create('div', 'main__container');
  }

  renderMain() {
    const main = create('main', 'main');
    const container = create('div', 'container');

    container.append(this.mainContainer);
    main.append(container);

    return main;
  }
}

export default new Main();
