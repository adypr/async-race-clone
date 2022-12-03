import Car from '../components/blocks/car';
import { ServerWinner } from '../types';
import getResponse, {
  changeWinner,
  path,
} from './utils';

const sendWinner = async (car: Car, duration: number) => {
  try {
    const getWinner = await getResponse(path.winners, car.id) as ServerWinner;
    const bestTime = duration < getWinner.time ? duration : getWinner.time;
    await changeWinner({ id: car.id, wins: getWinner.wins + 1, time: bestTime }, 'update');
    if (!Object.keys(getWinner).length) throw new Error();
  } catch {
    await changeWinner({ id: car.id, wins: 1, time: duration }, 'create');
  }
};

export default sendWinner;
