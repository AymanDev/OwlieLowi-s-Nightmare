import { Actor, Random, Trigger, vec } from 'excalibur';


import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace, getRandomRotation } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 32;

const rand = new Random();

export class Manga extends Actor {
  constructor() {
    super({ pos: getRandomPositionWithinPlayableSpace(), width: SIZE, height: SIZE });
  }

  onInitialize(engine: Game): void {
    this.rotation = getRandomRotation();

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
            Resources.MangaSoundAlt.play(1.25);
          }
          Resources.CollectSfx.play();

          engine.addPoints(1);

          engine.player.heal(35);
          engine.player.horny += 25;
          this.kill();
        }
      })
    );
  }
}
