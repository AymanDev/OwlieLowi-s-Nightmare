import { Actor, ActorArgs, CollisionType, Color, Random, Rectangle, Shape, Timer, Trigger, vec } from 'excalibur';
import { Resources } from '../../resources';
import { damageZoneCollisionGroup } from '../../collision-groups';
import { Game } from '../..';

const WIDTH = 200;
const HEIGHT = 720;
const SPEED = 50;

export class Bonk extends Actor {
  private _movementTimer: Timer;
  private _attackTimer: Timer;

  private _currentDifficulty = 1;

  private _currentDirection = 0;

  private _damageZone = new BonkDamageZone();

  constructor(config?: ActorArgs) {
    super({
      ...config,
      x: 100,
      y: 100,
      collider: Shape.Box(WIDTH, 20),
      collisionGroup: damageZoneCollisionGroup,
      collisionType: CollisionType.Active
    });
  }

  onInitialize(engine: Game): void {
    this.addChild(new BonkGraphics());
    this.addChild(this._damageZone);

    this.updateTimers(engine);
  }

  addDifficulty(engine: Game, difficultyIncrease: number) {
    this._currentDifficulty += difficultyIncrease;

    this.updateTimers(engine);
  }

  updateTimers(engine: Game) {
    if (this._movementTimer) {
      engine.currentScene.removeTimer(this._movementTimer);
    }

    this._movementTimer = new Timer({
      fcn: () => {
        if (this.pos.x > engine.player.pos.x) {
          this._currentDirection = -1;
        }
        if (this.pos.x < engine.player.pos.x) {
          this._currentDirection = 1;
        }

        this.vel.x = this._currentDirection * SPEED * this._currentDifficulty;
      },
      interval: 5000 / this._currentDifficulty,
      repeats: true
    });

    engine.currentScene.add(this._movementTimer);
    this._movementTimer.start();

    if (this._attackTimer) {
      this._attackTimer.cancel();
      engine.currentScene.removeTimer(this._attackTimer);
      this._damageZone.deactivate();
    }

    this._attackTimer = new Timer({
      fcn: () => {
        this._damageZone.activate();
      },
      repeats: true,
      interval: 3000 / this._currentDifficulty
    });

    engine.currentScene.add(this._attackTimer);
    this._attackTimer.start();
  }
}

export class BonkDamageZone extends Actor {
  private _deactivatorTimer: Timer;

  private _trigger: Trigger;

  private _isActive = false;

  constructor() {
    super({
      y: HEIGHT / 2
    });
  }

  onInitialize(engine: Game): void {
    this._trigger = new Trigger({
      width: WIDTH,
      height: HEIGHT,
      pos: vec(0, 0),

      target: engine.player,

      action: () => {
        engine.player.damage(25);
      }
    });

    this.graphics.use(
      new Rectangle({
        width: WIDTH,
        height: HEIGHT,
        color: new Color(255, 0, 0, 0.25)
      })
    );

    this.deactivate();

    this._deactivatorTimer = new Timer({
      fcn: this.deactivate.bind(this),
      interval: 1000
    });
    engine.add(this._deactivatorTimer);
  }

  activate() {
    if (this._isActive) {
      return;
    }

    this.addChild(this._trigger);

    this.graphics.visible = true;
    this._deactivatorTimer.start();

    this._isActive = true;
  }

  deactivate() {
    if (!this._isActive) {
      return;
    }

    this.graphics.visible = false;
    this.removeChild(this._trigger);

    this._isActive = false;
  }
}

export class BonkGraphics extends Actor {
  constructor() {
    super({
      x: 0,
      y: 0
    });
  }

  onInitialize(_engine: Game): void {
    this.graphics.use(Resources.ActorChat.toSprite());
  }
}
