import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  EmitterType,
  Engine,
  Keys,
  Logger,
  Random,
  Shape,
  Timer,
  vec
} from 'excalibur';

import { BubbleWrapEffect } from './effects/bubble-wrap-effect';
import { Effect } from './effects/effect';
import {
  drinkAnimation,
  idleAnimation,
  walkDownAnimation,
  walkLeftAnimation,
  walkRightAnimation,
  walkUpAnimation
} from './player.animations';
import { playerCollisionGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';
import { Enemy } from '../enemies/enemy';

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
  private _isDashDamaging = false;
  private _dashTimer: Timer;

  private _activeEffects: Effect[] = [];

  private _isDrinking = false;
  private _isDrinkingAnimationStarted = false;
  private _drinksAvailable = 1;

  constructor(private _engine: Game) {
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

  public get drinksAvailable() {
    return this._drinksAvailable;
  }

  public set drinksAvailable(value: number) {
    this._drinksAvailable = value;

    uiManager.hud.updateBottlesValueUI(this._drinksAvailable);
  }

  public get speedModificator() {
    return this._speedModificator;
  }

  public set speedModificator(value: number) {
    this._speedModificator = value;

    if (this._speedModificator < 1) {
      this._speedModificator = 1;
    }

    uiManager.hud.updateSpeedUI(this._speedModificator);
  }

  public get dragModificator() {
    return this._dragModificator;
  }

  public set dragModificator(value: number) {
    this._dragModificator = value;

    if (this._dragModificator < 1) {
      this._dragModificator = 1;
    }

    uiManager.hud.updateDragUI(this._dragModificator);
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

  public get isInHornyMode() {
    return this._isInHornyMode;
  }

  public get isDashDamaging() {
    return this._isDashDamaging;
  }

  onInitialize() {
    this.isDead = false;
    this.health = 100;
    this.speedModificator = 1;
    this.dragModificator = 1;
    this.horny = 0;
    this.drinksAvailable = 1;

    this.graphics.use(idleAnimation);
    uiManager.hud.updateHealthUI(this.health);
    uiManager.hud.hideHornyWarning();
    uiManager.hud.updateDashCooldown(100);

    this.on('collisionstart', (event) => this.onCollide(event));
  }

  onCollide(event: CollisionStartEvent<Actor>) {
    const other = event.other;

    if (!other.parent) {
      return;
    }

    if (!other.parent.hasTag('enemy')) {
      return;
    }

    const enemy = other.parent as Enemy;

    if (this._isDashDamaging) {
      enemy.die();
    }
  }

  getEffectIndexByName(name: string) {
    return this._activeEffects.findIndex((e) => e.name === name);
  }

  getEffectIndex(effect: Effect) {
    return this.getEffectIndexByName(effect.name);
  }

  getEffect(effect: Effect) {
    const idx = this.getEffectIndex(effect);

    if (idx === -1) {
      return undefined;
    }

    return this._activeEffects[idx];
  }

  addEffect(effect: Effect) {
    const existingEffect = this.getEffect(effect);

    if (existingEffect) {
      existingEffect.resetCooldown();

      return;
    }

    effect.start(this._engine);

    this._activeEffects.push(effect);
  }

  removeEffect(effect: Effect) {
    const existingEffectIdx = this.getEffectIndex(effect);

    if (existingEffectIdx === -1) {
      return;
    }

    this._activeEffects = this._activeEffects.filter((_, idx) => idx !== existingEffectIdx);
  }

  damage(damage: number) {
    if (this.getEffectIndexByName(BubbleWrapEffect.EFFECT_NAME) !== -1) {
      return;
    }

    if (damage > 0) {
      if (!Resources.EekSfx.isPlaying()) {
        Resources.EekSfx.playbackRate = rand.floating(0.9, 1.1);
        Resources.EekSfx.play(1);
      }

      this.horny -= 1;

      this.actions.fade(0, 100).fade(1, 100);
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

    if (this._dashTimer) {
      uiManager.hud.updateDashCooldown((this._dashTimer.getTimeRunning() / 2000) * 100);
    }

    this.updateHorny();

    this.updateDrinking();

    this.updateAnimations();

    this.applyDrag();
    this.updateInputs(engine);

    if (Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y) > 0) {
      if (!Resources.FootstepSfx.isPlaying()) {
        Resources.FootstepSfx.playbackRate = rand.floating(0.5, 1.5);
        Resources.FootstepSfx.play(0.02);
      }
    }
  }

  updateDrinking() {
    if (this._isDrinking) {
      if (!this._isDrinkingAnimationStarted) {
        this.heal(25);
        this.speedModificator -= 2;
        this.dragModificator -= 2;

        this.horny -= 15;

        this.vel.x = 0;
        this.vel.y = 0;
      }

      if (this._isDrinkingAnimationStarted && drinkAnimation.done) {
        Logger.getInstance().info('Drinking is finished');
        this._isDrinking = false;
        this._isDrinkingAnimationStarted = false;
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
        this.dragModificator -= 0.001;
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

    if (this._isDrinking) {
      this.vel = vec(xVel, yVel);
      return;
    }

    if (engine.input.keyboard.isHeld(Keys.Space) && this._drinksAvailable > 0) {
      this.drinksAvailable -= 1;
      this._isDrinking = true;
      Resources.DrinkSfx.play(0.15);
      return;
    }

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
      this._isDashDamaging = true;

      this._dashTimer = new Timer({
        fcn: () => {
          this._isDashAvailable = true;
          Resources.UiNeutralNotificationSfx.play();
        },
        interval: 2000
      });

      engine.currentScene.addTimer(this._dashTimer);

      this._dashTimer.start();

      const dashDamageTimer = new Timer({
        fcn: () => {
          this._isDashDamaging = false;
        },
        interval: 300
      });

      engine.currentScene.addTimer(dashDamageTimer);

      dashDamageTimer.start();

      Resources.DashSfx.play(0.15);
    }

    this.vel.x = xVel;
    this.vel.y = yVel;
  }

  updateAnimations() {
    if (this._isDrinking) {
      if (!this._isDrinkingAnimationStarted) {
        this._isDrinkingAnimationStarted = true;

        Logger.getInstance().info('Started plaing drink animation');
        drinkAnimation.reset();
        this.graphics.use(drinkAnimation);
      }
      return;
    }

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
