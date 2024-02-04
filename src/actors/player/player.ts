import { Actor, CollisionType, Color, KeyEvent, Keys, Logger, Random, Shape, Timer, clamp, vec } from 'excalibur';

import { BubbleWrapEffect } from './effects/bubble-wrap-effect';
import { ALL_EFFECT_NAME as ALL_EFFECT_NAMES, Effect } from './effects/effect';
import {
  drinkAnimation,
  idleAnimation,
  walkDownAnimation,
  walkLeftAnimation,
  walkRightAnimation,
  walkUpAnimation
} from './player.animations';
import { DamageZone } from './player.damage-zone';
import { playerCollisionGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

const SPEED = 200;
const DRAG_THRESHOLD = 50;
const DRAG = 2;
const REST_DRAG = 5;

const DASH_MULTIPLIER = 150;

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

  private _damageZone: DamageZone;

  private _isHasXInput = false;
  private _isHasYInput = false;

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

    ALL_EFFECT_NAMES.forEach(uiManager.hud.hideEffect);
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

    this.body.friction = 1;
    this.body.mass = 80;

    this._damageZone = new DamageZone(this);
    this.addChild(this._damageZone);
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

    uiManager.hud.showEffect(effect.name);

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

    uiManager.hud.hideEffect(effect.name);

    this._activeEffects = this._activeEffects.filter((_, idx) => idx !== existingEffectIdx);
  }

  damage(damage: number) {
    if (this.getEffectIndexByName(BubbleWrapEffect.EFFECT_NAME) !== -1) {
      return;
    }

    if (damage > 0) {
      if (!Resources.EekSfx.isPlaying()) {
        Resources.EekSfx.playbackRate = rand.floating(0.9, 1.1);
        Resources.EekSfx.play(1.25);
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

    if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      uiManager.hud.pressShiftKey();
    } else {
      uiManager.hud.unpressShiftKey();
    }

    if (engine.input.keyboard.isHeld(Keys.Space)) {
      uiManager.hud.pressSpacebarKey();
    } else {
      uiManager.hud.unpressSpacebarKey();
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
    let dragX = DRAG * this.dragModificator;
    let dragY = DRAG * this.dragModificator;

    if (!this._isHasXInput) {
      dragX = REST_DRAG * this.dragModificator;
    }

    if (!this._isHasYInput) {
      dragY = REST_DRAG * this.dragModificator;
    }

    if (this.vel.x > DRAG_THRESHOLD) {
      this.vel.x -= dragX;
    } else if (this.vel.x < -DRAG_THRESHOLD) {
      this.vel.x += dragX;
    } else if (!this._isHasXInput) {
      this.vel.x = 0;
    }

    if (this.vel.y > DRAG_THRESHOLD) {
      this.vel.y -= dragY;
    } else if (this.vel.y < -DRAG_THRESHOLD) {
      this.vel.y += dragY;
    } else if (!this._isHasYInput) {
      this.vel.y = 0;
    }

    let minSpeed = -SPEED * this.speedModificator;
    let maxSpeed = SPEED * this.speedModificator;

    if (this.isDashDamaging) {
      minSpeed *= DASH_MULTIPLIER;
      maxSpeed *= DASH_MULTIPLIER;
    }

    this.vel.x = clamp(this.vel.x, minSpeed, maxSpeed);
    this.vel.y = clamp(this.vel.y, minSpeed, maxSpeed);
  }

  updateInputs(engine: Game) {
    this._isHasXInput = false;
    this._isHasYInput = false;

    let xVel = 0;
    let yVel = 0;

    if (this._isDrinking) {
      this.vel = vec(xVel, yVel);
      return;
    }

    if (engine.input.keyboard.isHeld(Keys.Space) && this.drinksAvailable >= 1) {
      this.drinksAvailable -= 1;
      this._isDrinking = true;
      Resources.DrinkSfx.play(0.15);
      return;
    }

    const keys = [Keys.W, Keys.A, Keys.S, Keys.D, Keys.ArrowUp, Keys.ArrowDown, Keys.ArrowLeft, Keys.ArrowRight];

    if (!keys.some((key) => engine.input.keyboard.isHeld(key))) {
      return;
    }

    if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.ArrowUp)) {
      yVel -= SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.ArrowDown)) {
      yVel += SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
      xVel -= SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.ArrowRight)) {
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
      this.body.applyLinearImpulse(vec(xVel * DASH_MULTIPLIER, yVel * DASH_MULTIPLIER));

      this._isDashAvailable = false;
      this._isDashDamaging = true;

      this._dashTimer = new Timer({
        fcn: () => {
          this._isDashAvailable = true;
          Resources.UiNeutralNotificationSfx.play(0.25);
        },
        interval: 2000
      });

      engine.currentScene.addTimer(this._dashTimer);

      this._dashTimer.start();

      const dashDamageTimer = new Timer({
        fcn: () => {
          this._isDashDamaging = false;
        },
        interval: 400
      });

      engine.currentScene.addTimer(dashDamageTimer);

      dashDamageTimer.start();

      Resources.DashSfx.play(0.15);
    }

    this._isHasXInput = Math.abs(xVel) > 0;
    this._isHasYInput = Math.abs(yVel) > 0;

    if (this._isHasXInput || this._isHasYInput) {
      this.body.applyLinearImpulse(vec(xVel * 2, yVel * 2));
    }
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
