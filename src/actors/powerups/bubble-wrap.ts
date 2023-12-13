import { Actor, Trigger, vec } from 'excalibur';

import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';
import { BubbleWrapEffect } from '../player/effects/bubble-wrap-effect';

const SIZE = 64;

export class BubbleWrap extends Actor {
  constructor() {
    super({ width: SIZE, height: SIZE, pos: getRandomPositionWithinPlayableSpace() });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

    this.graphics.use(Resources.BubbleWrapImage.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          Resources.ProtectionSfx.play(0.5);

          engine.player.addEffect(new BubbleWrapEffect());

          this.kill();
        }
      })
    );
  }
}
