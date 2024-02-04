import { deathAnimation, idleAnimation } from './goblin.animations';
import { Game } from '../../../game';
import { Resources } from '../../../resources';
import { Enemy } from '../enemy';

const SPEED = 100;

export class Goblin extends Enemy {
  constructor() {
    super(SPEED, deathAnimation);
  }

  onInitialize(engine: Game): void {
    super.onInitialize(engine);

    this.graphics.use(idleAnimation);
  }

  onDead(engine:Game): void {
    super.onDead(engine);

    Resources.GoblinDeathSfx.play();

  }
}
