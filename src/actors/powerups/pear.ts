import { Actor, ActorArgs, Trigger, vec } from 'excalibur';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace } from '../../scenes/gamezone/gamezone.utils';
import { Game } from '../..';

const SIZE = 32;

export class Pear extends Actor {
  constructor(config?: ActorArgs) {
    super({
      ...config,
      width: SIZE,
      height: SIZE,
      pos: getRandomPositionWithinPlayableSpace()
    });
  }

  onInitialize(engine: Game): void {
    this.graphics.use(Resources.ActorPear.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          engine.points += 1;
          engine.player.heal(2);
          engine.player.speedModificator += 0.01;
          engine.player.dragModificator += 0.01;

          this.kill();
        }
      })
    );
  }
}
