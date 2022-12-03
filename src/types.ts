export type Path = {
  garage: string;
  winners: string;
  engine: string
};

export interface ServerCar extends NewCar {
  id: number
}

export interface NewCar {
  name: string,
  color: string,
}

export type Params = {
  key: string,
  value: number | string
};

export type ServerWinner = {
  id: number;
  wins: number;
  time: number
};

export type DriveResponse = {
  success: boolean
};

export type RaceResponse = {
  velocity: number,
  distance: number
};
