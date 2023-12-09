import { Actor, Trigger, vec } from 'excalibur';


import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 32;

export class Pantsu extends Actor {
  constructor() {
    super({ pos: getRandomPositionWithinPlayableSpace(), width: SIZE, height: SIZE });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

    this.graphics.use(Resources.PantsuImage.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        target: engine.player,

        pos: vec(0, 0),

        action: () => {
          Resources.PantsuSound.play(1);
          Resources.CollectSfx.play(0.25);

          engine.points += 20;
          engine.player.speedModificator += 0.2;
          engine.player.dragModificator += 0.2;
          engine.player.horny += 7;

          this.kill();
        }
      })
    );
  }
}
