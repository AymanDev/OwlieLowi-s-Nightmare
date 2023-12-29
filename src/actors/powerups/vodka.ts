import { Actor, Shape, Trigger, vec } from 'excalibur';

import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 32;

export class Vodka extends Actor {
  constructor() {
    super({
      pos: getRandomPositionWithinPlayableSpace(),
      width: SIZE,
      height: SIZE,

      collider: Shape.Box(SIZE, SIZE)
    });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          if (!Resources.VodkaSound.isPlaying()) {
            Resources.VodkaSound.play(0.6);
          }
          Resources.CollectSfx.play();

          engine.player.damage(10);
          engine.player.speedModificator += 0.1;

          engine.player.drinksAvailable += 0.5;

          this.kill();
        }
      })
    );

    this.graphics.use(Resources.VodkaImage.toSprite());
  }
}
