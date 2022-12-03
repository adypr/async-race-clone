import { carBrands, carModels } from './brands';

export default function create<T extends keyof HTMLElementTagNameMap>(
  elem: T,
  ...classes: string []
): HTMLElementTagNameMap[T] {
  const element = document.createElement(elem);
  if (classes.length) element.classList.add(...classes);
  return element;
}

export const domList = (selector: string) => document.querySelectorAll(selector);
export const domElem = (selector: string) => document.querySelector(selector);
export const domId = (selector: string | number) => document.getElementById(`${selector}`);

export const addEvent = (
  element: HTMLElement,
  event: string,
  func: (e: Event) => void,
  areOptions?: boolean,
) => element.addEventListener(event, func, areOptions);

export const randomNumber = (min: number, max: number) => Math.floor(Math.random()
    * (max - min + 1)) + min;

export const randomName = () => {
  const first = carBrands[randomNumber(0, carBrands.length - 1)];
  const second = carModels[randomNumber(0, carModels.length - 1)];
  return `${first} ${second}`;
};

export const randomColor = () => {
  const generateColor = () => {
    const color = randomNumber(0, 255).toString(16);
    return color.length === 1 ? `0${color}` : color;
  };
  return `#${generateColor()}${generateColor()}${generateColor()}`;
};
