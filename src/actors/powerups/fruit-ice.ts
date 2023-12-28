import { Actor, Trigger, vec } from 'excalibur';


import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 32;

export class FruitIce extends Actor {
  constructor() {
    super({ pos: getRandomPositionWithinPlayableSpace(), width: SIZE, height: SIZE });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

    this.graphics.use(Resources.FruitIceImage.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        target: engine.player,

        pos: vec(0, 0),

        action: () => {
          if (!Resources.FruitIceSound.isPlaying()) {
            Resources.FruitIceSound.play(0.5);
          }
          Resources.CollectSfx.play(0.1);

          engine.player.heal(10);

          engine.points += 2;
          engine.player.dragModificator -= 0.01;

          this.kill();
        }
      })
    );
  }
}
