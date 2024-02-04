import { Actor, Engine, Trigger, vec } from 'excalibur';

import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';
import { X2Effect } from '../player/effects/x2-effect';

const SIZE = 32;

export class Crocus extends Actor {
  constructor() {
    super({ width: SIZE, height: SIZE, pos: getRandomPositionWithinPlayableSpace() });

    this.rotation = getRandomRotation();

    this.graphics.use(Resources.CrocusImage.toSprite());
  }

  onInitialize(engine: Game): void {
    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          // Resources.ProtectionSfx.play(0.15);

          engine.player.addEffect(new X2Effect());

          this.kill();
        }
      })
    );
  }
}
