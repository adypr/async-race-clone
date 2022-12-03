import create from '../../base/utils';
import Pagination from '../pagination';

class WinnersRange {
  tBody: HTMLTableSectionElement;

  pagination: Pagination;

  trHeadWinsTitle: HTMLDivElement;

  winsSortUp: HTMLDivElement;

  winsSortDown: HTMLDivElement;

  trHeadTimeTitle: HTMLDivElement;

  timeSortUp: HTMLDivElement;

  timeSortDown:HTMLDivElement;

  constructor() {
    this.tBody = create('tbody');
    this.pagination = new Pagination();
    this.trHeadWinsTitle = create('div', 'winners__table-title');
    this.winsSortUp = create('div', 'winners__up');
    this.winsSortDown = create('div', 'winners__down');
    this.trHeadTimeTitle = create('div', 'winners__table-title');
    this.timeSortUp = create('div', 'winners__up');
    this.timeSortDown = create('div', 'winners__down');
  }

  renderWinners() {
    const winnersContainer = create('div', 'winners');
    const title = '<h2 class="winners__title">Winners</h2>';
    winnersContainer.insertAdjacentHTML('afterbegin', title);

    const table = create('table', 'winners__table');
    const tHead = create('thead');
    const trHead = create('tr');
    const trHeadContent = `<th class="winners__number" scope="col">№</td>
                            <th class="winners__car" scope="col">Car</td>
                            <th class="winners__name" scope="col">Name</td>`;
    trHead.insertAdjacentHTML('afterbegin', trHeadContent);

    const trHeadWins = create('th', 'winners__wins');
    trHeadWins.setAttribute('scope', 'col');
    const trHeadWinsWrapper = create('div', 'winners__wrapper');
    this.trHeadWinsTitle.textContent = 'Wins';
    this.winsSortUp.textContent = '↑';
    this.winsSortDown.textContent = '↓';
    trHeadWinsWrapper.append(this.trHeadWinsTitle, this.winsSortUp, this.winsSortDown);
    trHeadWins.append(trHeadWinsWrapper);

    const trHeadTime = create('th', 'winners__time');
    trHeadTime.setAttribute('scope', 'col');
    const trHeadTimeWrapper = create('div', 'winners__wrapper');
    this.trHeadTimeTitle.textContent = 'Best time, s';
    this.timeSortUp.textContent = '↑';
    this.timeSortDown.textContent = '↓';
    trHeadTimeWrapper.append(this.trHeadTimeTitle, this.timeSortUp, this.timeSortDown);
    trHeadTime.append(trHeadTimeWrapper);

    trHead.append(trHeadWins, trHeadTime);
    tHead.append(trHead);
    table.append(tHead, this.tBody);
    winnersContainer.append(
      table,
      this.pagination.renderPagination('winners'),
    );
    return winnersContainer;
  }
}

export default new WinnersRange();
