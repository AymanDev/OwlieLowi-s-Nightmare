import { deathAnimation, idleAnimation } from './fly.animations';
import { Game } from '../../../game';
import { Resources } from '../../../resources';
import { Enemy } from '../enemy';

const SPEED = 75;
const SIZE = 64;

export class Fly extends Enemy {
  constructor() {
    super(SPEED, deathAnimation);
  }

  onInitialize(engine: Game): void {
    super.onInitialize(engine);

    this.graphics.use(idleAnimation);
  }

  override onDead(_: Game): void {
    Resources.FlyDeathSfx.play();
  }

  onDamage(engine: Game): void {
    super.onDamage(engine);
    engine.player.damage(10);
  }
}
