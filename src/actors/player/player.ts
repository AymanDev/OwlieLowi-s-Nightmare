import { Actor, CollisionType, Color, Engine, Keys, Logger, Random, Shape, Timer, vec } from 'excalibur';

import { idleAnimation, walkDownAnimation, walkLeftAnimation, walkRightAnimation, walkUpAnimation } from './player.animations';
import { playerCollisionGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

const SPEED = 200;
const DRAG = 15;

const rand = new Random();

export class Player extends Actor {
  public health = 100;

  public isDead = false;

  private _speedModificator = 1;
  private _dragModificator = 1;

  private _horny = 0;
  private _isInHornyMode = false;

  private _isDashAvailable = true;

  constructor() {
    super({
      pos: vec(1280 / 2, 720 / 2),
      width: 80,
      height: 80,
      color: new Color(0, 0, 0),

      collider: Shape.Box(20, 20, vec(0.5, -0.5)),
      collisionType: CollisionType.Active,
      collisionGroup: playerCollisionGroup,

      z: 10
    });
  }

  public get speedModificator() {
    return this._speedModificator;
  }

  public set speedModificator(value: number) {
    this._speedModificator = value;

    uiManager.hud.updateSpeedUI(value);
  }

  public get dragModificator() {
    return this._dragModificator;
  }

  public set dragModificator(value: number) {
    this._dragModificator = value;

    uiManager.hud.updateDragUI(value);
  }

  public get horny() {
    return this._horny;
  }

  public set horny(value: number) {
    this._horny = value;

    if (this._horny > 100) {
      this._horny = 100;
    }

    if (this._horny < 0) {
      this._horny = 0;
    }

    uiManager.hud.updateHornyValueUI(this._horny);
  }

  onInitialize() {
    this.isDead = false;
    this.health = 100;
    this.speedModificator = 1;
    this.dragModificator = 1;
    this.horny = 0;

    this.graphics.use(idleAnimation);
    uiManager.hud.updateHealthUI(this.health);
  }

  damage(damage: number) {
    if (damage > 0) {
      if (!Resources.EekSfx.isPlaying()) {
        Resources.EekSfx.playbackRate = rand.floating(0.9, 1.1);
        Resources.EekSfx.play(1);
      }

      this.horny -= 1;
    }

    this.health -= damage;

    if (this.health <= 0) {
      this.health = 0;
    }

    uiManager.hud.updateHealthUI(this.health);
  }

  heal(heal: number) {
    this.damage(-heal);
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);

    if (this.health <= 0) {
      this.onDead(engine);
      return;
    }

    this.updateHorny();

    this.applyDrag();
    this.updateInputs(engine);
    this.updateAnimations();

    if (Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y) > 0) {
      if (!Resources.FootstepSfx.isPlaying()) {
        Resources.FootstepSfx.playbackRate = rand.floating(0.5, 1.5);
        Resources.FootstepSfx.play(0.08);
      }
    }
  }

  updateHorny() {
    if (this._isInHornyMode) {
      if (this.horny <= 75) {
        this._isInHornyMode = false;
        uiManager.hud.hideHornyWarning();
      }

      // this.damage(0.001);
      if (this.speedModificator > 1) {
        this.speedModificator -= 0.001;
      }

      if (this.dragModificator > 1) {
        this._dragModificator -= 0.001;
      }

      return;
    }

    if (this.horny < 100) {
      this.horny += 0.025;
      return;
    }

    this._isInHornyMode = true;
    uiManager.hud.showHornyWarning();

    Resources.AlarmSfx.play(0.25);
  }

  applyDrag() {
    if (this.vel.x > DRAG) {
      this.vel.x -= DRAG * this.dragModificator;
    } else if (this.vel.x < -DRAG) {
      this.vel.x += DRAG * this.dragModificator;
    } else {
      this.vel.x = 0;
    }

    if (this.vel.y > DRAG) {
      this.vel.y -= DRAG * this.dragModificator;
    } else if (this.vel.y < -DRAG) {
      this.vel.y += DRAG * this.dragModificator;
    } else {
      this.vel.y = 0;
    }
  }

  updateInputs(engine: Engine) {
    let xVel = 0;
    let yVel = 0;

    const keys = [Keys.W, Keys.A, Keys.S, Keys.D];

    if (!keys.some((key) => engine.input.keyboard.isHeld(key))) {
      return;
    }

    if (engine.input.keyboard.isHeld(Keys.W)) {
      yVel -= SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.S)) {
      yVel += SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.A)) {
      xVel -= SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.D)) {
      xVel += SPEED;
    }

    if (Math.abs(yVel) > 0) {
      xVel *= this.speedModificator / 1.5;
    } else {
      xVel *= this.speedModificator;
    }

    if (Math.abs(xVel) > 0) {
      yVel *= this.speedModificator / 1.5;
    } else {
      yVel *= this.speedModificator;
    }

    if (this._isDashAvailable && engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      if (Math.abs(xVel) > 0) {
        xVel *= 20;
      }

      if (Math.abs(yVel) > 0) {
        yVel *= 20;
      }

      this._isDashAvailable = false;

      const dashTimer = new Timer({
        fcn: () => {
          this._isDashAvailable = true;
        },
        interval: 2000
      });

      engine.currentScene.addTimer(dashTimer);

      dashTimer.start();

      Resources.DashSfx.play(1);
    }

    this.vel.x = xVel;
    this.vel.y = yVel;
  }

  updateAnimations() {
    if (this.vel.x > 0) {
      this.graphics.use(walkRightAnimation);
      return;
    }

    if (this.vel.x < 0) {
      this.graphics.use(walkLeftAnimation);
      return;
    }

    if (this.vel.y > 0) {
      this.graphics.use(walkDownAnimation);
      return;
    }

    if (this.vel.y < 0) {
      this.graphics.use(walkUpAnimation);
      return;
    }

    this.graphics.use(idleAnimation);
  }

  onDead(engine: Game) {
    if (this.isDead) {
      return;
    }

    this.isDead = true;

    Logger.getInstance().info('You are dead!');

    this.health = 0;
    this.vel.x = 0;
    this.vel.y = 0;

    engine.goToScene('gameover');

    uiManager.hud.hideHornyWarning();
  }
}
