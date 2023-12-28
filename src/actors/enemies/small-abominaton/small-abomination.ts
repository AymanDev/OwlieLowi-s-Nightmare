import { deathAnimation, idleAnimation } from './small-abomination.animations';
import { Game } from '../../../game';
import { Resources } from '../../../resources';
import { Enemy } from '../enemy';

const SPEED = 50;

export class SmallAbomination extends Enemy {
  constructor() {
    super(SPEED, deathAnimation);
  }

  onInitialize(engine: Game): void {
    super.onInitialize(engine);

    this.graphics.use(idleAnimation);
  }

  onDead(): void {
    super.onDead();

    Resources.SmallAbominationDeathSfx.play();
  }
}
