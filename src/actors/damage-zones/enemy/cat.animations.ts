import { Animation, AnimationStrategy, SpriteSheet, range } from 'excalibur';

import { Resources } from '../../../resources';

const showupSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.EnemyShowupSpriteSheet,
  grid: {
    rows: 10,
    columns: 11,
    spriteWidth: 330,
    spriteHeight: 200
  }
});

const idleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.EnemyIdleSpriteSheet,
  grid: {
    rows: 5,
    columns: 5,
    spriteWidth: 330,
    spriteHeight: 200
  }
});

export const idleBlinkAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(0, 5 - 1), 150);
export const idleSquintAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(5, 10 - 1), 150, AnimationStrategy.Freeze);
export const idleMeowAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(10, 15 - 1), 150, AnimationStrategy.Freeze);
export const idleEyesAnimation = Animation.fromSpriteSheet(idleSpriteSheet, range(15, 25 - 1), 150, AnimationStrategy.Freeze);

export type IdleAnimationState = 'blink' | 'squint' | 'meow' | 'eyes';

export const showupAnimation = Animation.fromSpriteSheet(showupSpriteSheet, range(0, 110 - 1), 50, AnimationStrategy.Freeze);
