import {
  Path, NewCar, ServerCar, Params, ServerWinner, DriveResponse, RaceResponse,
} from '../types';

const baseUrl = 'http://localhost:3000';

export const path: Path = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

export const GLOBAL_PARAMS = {
  totalCars: 0,
  carsPerPage: 7,
  totalWinners: 0,
  winnersPerPage: 10,
  currentGaragePage: 1,
  currentWinnersPage: 1,
  generateCarsCount: 100,
  sort: 'id',
  order: 'ASC',
};

export const RACE_PARAMS: {
  currentRacers: Map<number, number | null>;
  raceState: 'off' | 'on'
} = {
  currentRacers: new Map(),
  raceState: 'off',
};

export const pagesCount = (
  total: number,
  itemsPerPage: number,
) => (!total ? 1 : Math.ceil(total / itemsPerPage));

enum Pars {
  '_page', '_limit', '_sort', '_order',
}

export const defineParams = (
  currentPage: number,
  carsPerPage: number,
  sorting?: string[],
) => {
  const mapParams = (ParamsArr: Array<string | number>) => ParamsArr.map((param, i) => ({
    key: Pars[i],
    value: param,
  }));
  const params = sorting ? [currentPage, carsPerPage, sorting[0], sorting[1]]
    : [currentPage, carsPerPage];
  return mapParams(params);
};

const generateQueryString = (queryParams: Array<Params> | number) => {
  if (typeof queryParams === 'number') return `/${queryParams}`;
  return (queryParams.length ? `?${queryParams.map((param: Params) => `${param.key}=${param.value}`).join('&')}` : '');
};

const getResponse = async <T>(directoryPath: string, params: Array<Params> | number = [])
: Promise<T[] | T> => {
  const response = await fetch(`${baseUrl}${directoryPath}${generateQueryString(params)}`);
  if (directoryPath === path.garage) GLOBAL_PARAMS.totalCars = Number(response.headers.get('X-Total-Count'));
  if (directoryPath === path.winners) GLOBAL_PARAMS.totalWinners = Number(response.headers.get('X-Total-Count'));
  const data = await response.json() as Promise<T[]>;
  return data;
};

export default getResponse;

// Race

export const switchEngine = async (id : number, status: string): Promise<RaceResponse> => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  const result = await response.json() as Promise<RaceResponse>;
  return result;
};

export const switchDrive = async (id : number, status: string): Promise<DriveResponse> => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  const result = await response.json() as Promise<DriveResponse>;
  return result;
};

// Garage

export const createCar = async (newCar: NewCar) => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  });

  const result = await response.json() as Promise<ServerCar>;
  return result;
};

export const updateCar = async (id: number, name: string, color: string) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, color }),
  });
  const result = await response.json() as Promise<ServerCar>;
  return result;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json() as Promise<ServerCar>;
  return result;
};

// Winners

export const changeWinner = async (winner: ServerWinner, method: 'update' | 'create' | 'delete') => {
  let response;
  let result: Promise<ServerWinner> | ServerWinner | undefined;
  switch (method) {
    case 'update':
      response = await fetch(`${baseUrl}${path.winners}/${winner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      });
      result = await response.json() as Promise<ServerWinner>;
      break;
    case 'create':
      response = await fetch(`${baseUrl}${path.winners}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      });
      result = await response.json() as Promise<ServerWinner>;
      break;
    default:
      response = await getResponse(path.winners);
      if ((response as ServerCar[]).find((serverWinner) => serverWinner.id === winner.id)) {
        await fetch(`${baseUrl}${path.winners}/${winner.id}`, {
          method: 'DELETE',
        });
      }
  }
  return result;
};
