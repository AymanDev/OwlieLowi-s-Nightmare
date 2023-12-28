import { Animation, AnimationStrategy, SpriteSheet, range } from 'excalibur';

import { Resources } from '../../../resources';

const idleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.SmallAbominationIdleSpriteSheet,
  grid: {
    rows: 1,
    columns: 6,
    spriteWidth: 96,
    spriteHeight: 96
  }
});

const deathSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.SmallAbominationDeathSpriteSheet,
  grid: {
    rows: 1,
    columns: 13,
    spriteWidth: 96,
    spriteHeight: 96
  }
});

export const idleAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(0, 5), 150);
export const deathAnimation = Animation.fromSpriteSheet(deathSpriteSheet, range(0, 12), 150, AnimationStrategy.Freeze);
