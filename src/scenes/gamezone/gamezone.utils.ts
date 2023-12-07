import { Random, vec } from 'excalibur';
import { SCENE_PADDING, WIDTH, HEIGHT } from './gamezone';

const rand = new Random();

export const getRandomPositionWithinPlayableSpace = () => {
  return vec(rand.integer(SCENE_PADDING, WIDTH - SCENE_PADDING), rand.integer(300, HEIGHT - SCENE_PADDING));
};
