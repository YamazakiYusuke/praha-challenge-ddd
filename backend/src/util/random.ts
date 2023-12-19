import { uuid } from 'uuidv4'

export const createRandomIdString = () => {
  return uuid()
}

export const createRandomNum = () => {
  return Math.random();
}

export const createRandomNumUpTo = (max: number) => {
  return Math.floor(Math.random() * max);
}

