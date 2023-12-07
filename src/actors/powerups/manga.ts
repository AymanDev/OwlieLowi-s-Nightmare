import { Actor, Random, Trigger, vec } from 'excalibur';
import { getRandomPositionWithinPlayableSpace } from '../../scenes/gamezone/gamezone.utils';
import { Resources } from '../../resources';
import { Game } from '../..';

const SIZE = 64;

const rand = new Random();

export class Manga extends Actor {
  constructor() {
    super({ pos: getRandomPositionWithinPlayableSpace(), width: SIZE, height: SIZE });
  }

  onInitialize(engine: Game): void {
    this.graphics.use(Resources.MangaImage.toSprite());

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        target: engine.player,

        pos: vec(0, 0),

        action: () => {
          if (rand.integer(0, 100) > 50) {
            Resources.MangaSound.play(1);
          } else {
            Resources.MangaSoundAlt.play(1);
          }

          engine.player.heal(25);

          this.kill();
        }
      })
    );
  }
}
