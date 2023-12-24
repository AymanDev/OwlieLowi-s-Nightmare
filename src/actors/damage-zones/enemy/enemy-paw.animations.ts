import { SpriteSheet, range, Animation } from 'excalibur';

import { Resources } from '../../../resources';

const pawSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.EnemyPawAttackSpriteSheet,
  grid: {
    rows: 4,
    columns: 4,
    spriteWidth: 196,
    spriteHeight: 383
  }
});

export const pawAtRestImage = pawSpriteSheet.getSprite(0, 0);

export const attackAnimation = Animation.fromSpriteSheet(pawSpriteSheet, [0, ...range(9, 13)], 100);
