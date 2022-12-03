import create from '../../base/utils';

const navItems: Array<keyof Header> = ['garage', 'winners'];

class Header {
  garage: HTMLAnchorElement;

  winners: HTMLAnchorElement;

  constructor() {
    this.garage = create('a', 'header__garage');
    this.winners = create('a', 'header__winners');
  }

  renderHeader() {
    const header = create('header', 'header');
    const container = create('div', 'container');
    const headerContainer = create('div', 'header__container');
    const nav = create('nav', 'header__nav');
    const navList = create('ul', 'header__list');

    navItems.forEach((item) => {
      const navItem = create('li', 'header__item');
      (this[item] as HTMLAnchorElement).href = `#/${item}`;
      (this[item] as HTMLAnchorElement).textContent = item;

      navItem.appendChild(this[item] as HTMLAnchorElement);
      navList.appendChild(navItem);
    });

    nav.appendChild(navList);

    const logo = create('div', 'header__logo');
    const title = create('h1', 'header__title');
    title.textContent = 'Async Race';
    logo.append(title);

    headerContainer.append(nav, logo);
    container.append(headerContainer);
    header.append(container);

    return header;
  }
}

export default new Header();
