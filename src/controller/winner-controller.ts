import winners from '../components/blocks/winners';
import { addEvent } from '../components/base/utils';
import { GLOBAL_PARAMS, pagesCount } from './utils';
import winnersBuilder from '../winners-builder';

const addWinnersPaginationControl = () => {
  addEvent(winners.pagination.buttonNext, 'click', () => {
    (async () => {
      const pages = pagesCount(GLOBAL_PARAMS.totalWinners, GLOBAL_PARAMS.winnersPerPage);
      if (GLOBAL_PARAMS.currentWinnersPage < pages) {
        winners.pagination.buttonPrev.disabled = false;
        GLOBAL_PARAMS.currentWinnersPage += 1;
        winners.pagination.current.textContent = `${GLOBAL_PARAMS.currentWinnersPage} / ${pagesCount(GLOBAL_PARAMS.totalWinners, GLOBAL_PARAMS.winnersPerPage)}`;
        await winnersBuilder();
      }
      if (GLOBAL_PARAMS.currentWinnersPage === pages) {
        winners.pagination.buttonNext.disabled = true;
      }
    })().catch(() => { console.log('winners.pagination.buttonNext'); });
  });

  addEvent(winners.pagination.buttonPrev, 'click', () => {
    (async () => {
      if (GLOBAL_PARAMS.currentWinnersPage > 1) {
        winners.pagination.buttonNext.disabled = false;
        GLOBAL_PARAMS.currentWinnersPage -= 1;
        winners.pagination.current.textContent = `${GLOBAL_PARAMS.currentWinnersPage} / ${pagesCount(GLOBAL_PARAMS.totalWinners, GLOBAL_PARAMS.winnersPerPage)}`;
        await winnersBuilder();
      }
      if (GLOBAL_PARAMS.currentWinnersPage <= 1) {
        winners.pagination.buttonPrev.disabled = true;
      }
    })().catch(() => { console.log('Log winners.pagination.buttonPrev'); });
  });
};

const addWinnersSortControl = () => {
  addEvent(winners.winsSortUp, 'click', () => {
    (async () => {
      GLOBAL_PARAMS.sort = 'wins';
      GLOBAL_PARAMS.order = 'ASC';
      await winnersBuilder();
    })().catch(() => { console.log('Log winners.winsSortUp'); });
  });

  addEvent(winners.winsSortDown, 'click', () => {
    (async () => {
      GLOBAL_PARAMS.sort = 'wins';
      GLOBAL_PARAMS.order = 'DESC';
      await winnersBuilder();
    })().catch(() => { console.log('Log winners.winsSortDown'); });
  });

  addEvent(winners.timeSortUp, 'click', () => {
    (async () => {
      GLOBAL_PARAMS.sort = 'time';
      GLOBAL_PARAMS.order = 'ASC';
      await winnersBuilder();
    })().catch(() => { console.log('Log winners.timeSortUp'); });
  });

  addEvent(winners.timeSortDown, 'click', () => {
    (async () => {
      GLOBAL_PARAMS.sort = 'time';
      GLOBAL_PARAMS.order = 'DESC';
      await winnersBuilder();
    })().catch(() => { console.log('Log winners.timeSortDown'); });
  });
};

const renderWinnersControl = () => {
  addWinnersPaginationControl();
  addWinnersSortControl();
};

export default renderWinnersControl;
