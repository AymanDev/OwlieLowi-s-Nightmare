import { Random, vec } from 'excalibur';

import { SCENE_HEIGHT, SCENE_PADDING, SCENE_WIDTH } from './gamezone';

const rand = new Random();

export const getRandomPositionWithinPlayableSpace = () => {
  return vec(rand.integer(SCENE_PADDING, SCENE_WIDTH - SCENE_PADDING), rand.integer(350, SCENE_HEIGHT - SCENE_PADDING));
};

export const getRandomRotation = () => {
  return rand.integer(0, 100) / 100;
};
