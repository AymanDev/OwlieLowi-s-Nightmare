import { Timer } from 'excalibur';

import { Game } from '../../../game';

export const ALL_EFFECT_NAME = [];

export class Effect {
  private _timer: Timer;

  constructor(
    private _name: string,
    private _cooldown: number
  ) {
    ALL_EFFECT_NAME.push(_name);
  }

  public get name() {
    return this._name;
  }

  public start(engine: Game) {
    this._timer = new Timer({ interval: this._cooldown, fcn: () => this.stop(engine) });

    engine.addTimer(this._timer);

    this._timer.start();
  }

  public resetCooldown() {
    if (!this._timer) {
      return;
    }

    this._timer.reset(this._cooldown);

    if (!this._timer.isRunning) {
      this._timer.start();
    }
  }

  public stop(engine: Game) {
    if (!this._timer) {
      return;
    }

    this._timer.cancel();
    engine.removeTimer(this._timer);
    engine.player.removeEffect(this);
  }
}
