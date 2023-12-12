import { Animation, SpriteSheet, range } from 'excalibur';

import { Resources } from '../../resources';

const spriteSheet = SpriteSheet.fromImageSource({
  image: Resources.ActorMainSpriteSheet,
  grid: {
    rows: 10,
    columns: 8,
    spriteWidth: 80,
    spriteHeight: 80
  }
});

export const SIZE = 8;
export const SPEED = 100;

export const walkLeftAnimation = Animation.fromSpriteSheet(spriteSheet, range(0, SIZE - 1), SPEED);
export const walkDownAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE, SIZE * 2 - 1), SPEED);
export const walkRightAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE * 2, SIZE * 3 - 1), SPEED);
export const walkUpAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE * 3, SIZE * 4 - 1), SPEED);

export const idleAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE * 5, SIZE * 6 - 1), SPEED);
export const drinkAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE * 8, SIZE * 9 - 1), SPEED);
export const yayAnimation = Animation.fromSpriteSheet(spriteSheet, range(SIZE * 9, SIZE * 10 - 1), SPEED);
