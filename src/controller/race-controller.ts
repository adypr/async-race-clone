import { domList } from '../components/base/utils';
import control from '../components/blocks/control';
import { RACE_PARAMS } from './utils';

const controller = (buttonSelector: string) => {
  (async () => {
    const allButtons = domList(buttonSelector);
    const arr = Array.from(allButtons).map((elem) => {
      const result = new Promise(() => {
        (elem as HTMLButtonElement).click();
      });
      return result;
    });
    await Promise.all(arr).then((data) => console.log('data', data));
  })().catch(() => { console.log('Log in Promise.all'); });
};

const raceControl = () => {
  const race = () => {
    control.reset.click();
    RACE_PARAMS.raceState = 'on';
    controller('.car__move');
  };

  const reset = () => {
    controller('.car__back');
    RACE_PARAMS.currentRacers = new Map();
  };

  control.race.onclick = race;
  control.reset.onclick = reset;
};

export default raceControl;
