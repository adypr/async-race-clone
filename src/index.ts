import './style.scss';
import pageBuilder from './builder';
import routing from './routing';
import renderGarageControl from './controller/garage-controller';
import renderWinnersControl from './controller/winner-controller';

routing();

renderGarageControl();
renderWinnersControl();
pageBuilder().catch((e: Error) => { console.log('Launch Error', e); });
