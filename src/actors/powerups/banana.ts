import { Actor, ActorArgs, Trigger, vec } from 'excalibur';

import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 32;

export class Banana extends Actor {
  constructor(config?: ActorArgs) {
    super({
      ...config,
      width: SIZE,
      height: SIZE,
      scale: vec(1.25, 1.25),

      pos: getRandomPositionWithinPlayableSpace()
    });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

    this.graphics.use(Resources.BananaImage.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          Resources.CollectSfx.play();

          engine.addPoints(1);
          engine.player.heal(2);
          engine.player.speedModificator += 0.01;
          engine.player.dragModificator += 0.01;
          engine.player.horny -= 1;

          this.kill();
        }
      })
    );
  }
}
