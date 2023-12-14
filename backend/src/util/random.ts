import { uuid } from 'uuidv4'

export const createRandomIdString = () => {
  return uuid()
}

export const createRandomNumber = (max: number | undefined) => {
  if (max === undefined) {
    return Math.random();
  } else {
    return Math.floor(Math.random() * max);
  }
}
