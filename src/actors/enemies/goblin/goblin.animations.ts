import { Animation, AnimationStrategy, SpriteSheet, range } from 'excalibur';

import { Resources } from '../../../resources';

const idleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.GoblinIdleSpriteSheet,
  grid: { rows: 1, columns: 6, spriteWidth: 100, spriteHeight: 100 }
});

const deathSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.GoblinDeathSpriteSheet,
  grid: { rows: 1, columns: 12, spriteWidth: 100, spriteHeight: 100 }
});

export const idleAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(0, 5), 150);
export const deathAnimation = Animation.fromSpriteSheet(deathSpriteSheet, range(0,11), 150,AnimationStrategy.Freeze);