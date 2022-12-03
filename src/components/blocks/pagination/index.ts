import { GLOBAL_PARAMS, pagesCount } from '../../../controller/utils';
import create from '../../base/utils';

export default class Pagination {
  buttonPrev: HTMLButtonElement;

  current: HTMLDivElement;

  buttonNext: HTMLButtonElement;

  constructor() {
    this.buttonPrev = create('button', 'pagination__prev');
    this.current = create('div', 'pagination__current');
    this.buttonNext = create('button', 'pagination__next');
  }

  renderPagination(page: 'garage' | 'winners') {
    const params = {
      currentPage: page === 'garage' ? GLOBAL_PARAMS.currentGaragePage : GLOBAL_PARAMS.currentWinnersPage,
      totalCars: page === 'garage' ? GLOBAL_PARAMS.totalCars : GLOBAL_PARAMS.totalWinners,
      carsPerPage: page === 'garage' ? GLOBAL_PARAMS.carsPerPage : GLOBAL_PARAMS.winnersPerPage,
    };

    const paginationContainer = create('div', 'pagination');
    this.buttonPrev.disabled = !(params.currentPage > 1);
    this.buttonPrev.textContent = 'Prev';
    const totalPages = pagesCount(params.totalCars, params.carsPerPage);
    this.current.textContent = `${params.currentPage} / ${totalPages}`;
    this.buttonNext.disabled = !(params.currentPage < totalPages);
    this.buttonNext.textContent = 'Next';

    paginationContainer.append(this.buttonPrev, this.current, this.buttonNext);

    return paginationContainer;
  }
}
