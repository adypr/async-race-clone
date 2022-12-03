import winners from './components/blocks/winners';
import getResponse, {
  GLOBAL_PARAMS, path, defineParams, pagesCount,
} from './controller/utils';

import { ServerCar, ServerWinner } from './types';

const winnersBuilder = async () => {
  winners.tBody.innerHTML = '';
  const garageCars = await getResponse<ServerCar>(path.garage);
  const params = defineParams(
    GLOBAL_PARAMS.currentWinnersPage,
    GLOBAL_PARAMS.winnersPerPage,
    [GLOBAL_PARAMS.sort, GLOBAL_PARAMS.order],
  );
  const res = await getResponse<ServerWinner>(path.winners, params);
  winners.pagination.current.textContent = `${GLOBAL_PARAMS.currentWinnersPage} / ${pagesCount(GLOBAL_PARAMS.totalWinners, GLOBAL_PARAMS.winnersPerPage)}`;

  const totalPages = GLOBAL_PARAMS.totalWinners / GLOBAL_PARAMS.winnersPerPage;
  if (GLOBAL_PARAMS.currentWinnersPage < totalPages) winners.pagination.buttonNext.disabled = false;
  (res as ServerWinner[]).forEach((winner: ServerWinner, i: number) => {
    const car = (garageCars as ServerCar[]).find((elem) => elem.id === winner.id);
    const rowContent = `<tr><td>${i + 1}</td>
                        <td><svg class="car__img" width="100" height="35" fill="${car?.color || 'black'}">
                                <use xlink:href="./assets/icons/sprite.svg#car"></use>
                            </svg></td>
                        <td>${car?.name || 'car'}</td>
                        <td>${winner.wins}</td>
                        <td>${winner.time}</td></tr>`;
    winners.tBody.insertAdjacentHTML('beforeend', rowContent);
  });
};

export default winnersBuilder;
