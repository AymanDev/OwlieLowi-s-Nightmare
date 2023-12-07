import { Actor, Random, Shape, Trigger, vec } from 'excalibur';
import { Resources } from '../../resources';
import { Game } from '../..';
import { getRandomPositionWithinPlayableSpace } from '../../scenes/gamezone/gamezone.utils';

const rand = new Random();

export class Vodka extends Actor {
  constructor() {
    super({
      pos: getRandomPositionWithinPlayableSpace(),

      collider: Shape.Box(64, 64)
    });
  }

  onInitialize(engine: Game): void {
    this.rotation = rand.integer(0, 100) / 100;

    this.addChild(
      new Trigger({
        width: 64,
        height: 64,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          Resources.VodkaSound.play(1);

          engine.player.damage(10);
          engine.player.speedModificator += 0.1;

          this.kill();
        }
      })
    );

    this.graphics.use(Resources.VodkaImage.toSprite());
  }
}
