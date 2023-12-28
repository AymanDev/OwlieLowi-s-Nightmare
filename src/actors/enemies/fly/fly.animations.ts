import { Animation, AnimationStrategy, SpriteSheet, range } from 'excalibur';

import { Resources } from '../../../resources';

const idleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.FlyEnemyIdleSpriteSheet,
  grid: {
    spriteWidth: 64,
    spriteHeight: 54,
    rows: 1,
    columns: 8
  }
});

const deathSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.FlyEnemyDeathSpriteSheet,
  grid: {
    spriteWidth: 64,
    spriteHeight: 64,
    rows: 1,
    columns: 11
  }
});

export const idleAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(0, 7), 150);
export const deathAnimation = Animation.fromSpriteSheet(deathSpriteSheet, range(0, 10), 150, AnimationStrategy.Freeze);
