import main from './components/blocks/main';
import winners from './components/blocks/winners';
import control from './components/blocks/control';
import garage from './components/blocks/garage';
import winnersBuilder from './winners-builder';
import pageBuilder from './builder';

const locationResolver = async (location: string) => {
  main.mainContainer.innerHTML = '';
  if (location === '#/winners') {
    main.mainContainer.append(winners.renderWinners());
    await winnersBuilder();
  } else {
    await pageBuilder();
    main.mainContainer.innerHTML = '';
    main.mainContainer.append(control.renderControl(), garage.renderGarage());
  }
};

export default () => {
  window.addEventListener('load', () => {
    window.location.hash = '#/garage';
    winners.tBody.innerHTML = '';
  });

  window.addEventListener('hashchange', () => {
    winners.tBody.innerHTML = '';
    (async () => {
      const loc = window.location.hash;
      winners.tBody.innerHTML = '';
      await locationResolver(loc);
    })().catch(() => {});
  });
};
