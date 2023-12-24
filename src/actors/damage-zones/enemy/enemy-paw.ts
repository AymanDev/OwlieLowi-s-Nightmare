import { Actor, Timer, Trigger, ActorArgs, vec } from 'excalibur';

import { pawAtRestImage, attackAnimation } from './enemy-paw.animations';
import { Game } from '../../../game';

export class EnemyPaw extends Actor {
  private _deactivatorTimer: Timer;

  private _trigger: Trigger;

  private _isActive = false;

  constructor(config?: ActorArgs) {
    super(config);
  }

  onInitialize(engine: Game): void {
    this._trigger = new Trigger({
      width: 200,
      height: 720,
      pos: vec(0, 0),

      target: engine.player,

      action: () => {
        engine.player.damage(25);
      }
    });

    this.graphics.use(pawAtRestImage);
    this.graphics.visible = false;

    this.deactivate();

    this._deactivatorTimer = new Timer({
      fcn: this.deactivate.bind(this),
      interval: 500
    });
    engine.add(this._deactivatorTimer);
  }

  activate() {
    if (this._isActive) {
      return;
    }

    this.addChild(this._trigger);

    this._deactivatorTimer.start();

    attackAnimation.reset();
    this.graphics.use(attackAnimation);

    this._isActive = true;
  }

  deactivate() {
    if (!this._isActive) {
      return;
    }

    this.graphics.use(pawAtRestImage);
    this.removeChild(this._trigger);

    this._isActive = false;
  }
}
