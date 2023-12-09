import { Random, vec } from 'excalibur';

import { HEIGHT, SCENE_PADDING, WIDTH } from './gamezone';

const rand = new Random();

export const getRandomPositionWithinPlayableSpace = () => {
  return vec(rand.integer(SCENE_PADDING, WIDTH - SCENE_PADDING), rand.integer(300, HEIGHT - SCENE_PADDING));
};

export const getRandomRotation = () => {
  return rand.integer(0, 100) / 100;
};
