import { Actor, ActorArgs, Color, Engine, Rectangle, Trigger, vec } from 'excalibur';
import { getRandomPositionWithinPlayableSpace } from '../../scenes/gamezone/gamezone.utils';
import { Game } from '../..';

const WIDTH = 32;
const HEIGHT = 32;

export class Hole extends Actor {
  constructor(config?: ActorArgs) {
    super({ ...config, width: WIDTH, height: HEIGHT, pos: getRandomPositionWithinPlayableSpace() });
  }

  onInitialize(engine: Game): void {
    this.graphics.use(
      new Rectangle({
        width: WIDTH,
        height: HEIGHT,
        color: new Color(255, 0, 0, 0.25)
      })
    );

    this.addChild(
      new Trigger({
        width: WIDTH,
        height: HEIGHT,
        pos: vec(0, 0),

        target: engine.player,

        action: () => {
          engine.player.damage(10);

          this.kill();
        }
      })
    );
  }
}
