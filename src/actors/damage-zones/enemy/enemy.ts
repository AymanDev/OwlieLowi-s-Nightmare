import { Actor, ActorArgs, CollisionType, Logger, Random, Shape, Timer, vec } from 'excalibur';

import { EnemyPaw } from './enemy-paw';
import {
  IdleAnimationState,
  idleBlinkAnimation,
  idleEyesAnimation,
  idleMeowAnimation,
  idleSquintAnimation,
  showupAnimation
} from './enemy.animations';
import { damageZoneCollisionGroup } from '../../../collision-groups';
import { Game } from '../../../game';
import { SCENE_WIDTH } from '../../../scenes/gamezone/gamezone';
import { BubbleWrapEffect } from '../../player/effects/bubble-wrap-effect';

const WIDTH = 330;
const SPEED = 50;

const rand = new Random();

export class Enemy extends Actor {
  private _movementTimer: Timer;
  private _attackTimer: Timer;

  private _currentDirection = 0;

  private _leftPaw = new EnemyPaw({ x: -87, y: 181, z: 1 });
  private _rightPaw = new EnemyPaw({ x: 93, y: 181, z: 1, scale: vec(-1, 1) });

  private _showedUp = false;
  private _idleAnimationState: IdleAnimationState = 'blink';
  private _idleAnimationStateCanBeChanged = true;

  constructor(config?: ActorArgs) {
    super({
      ...config,
      x: SCENE_WIDTH / 2,
      y: 242,

      z: 2,

      collider: Shape.Box(WIDTH, 20),
      collisionGroup: damageZoneCollisionGroup,
      collisionType: CollisionType.Active
    });
  }

  onInitialize(_engine: Game): void {
    showupAnimation.reset();
    this.graphics.use(showupAnimation);

    this.addChild(this._leftPaw);
    this.addChild(this._rightPaw);
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);

    if (!this._showedUp && showupAnimation.done) {
      this._showedUp = showupAnimation.done;
      this._leftPaw.graphics.visible = true;
      this._rightPaw.graphics.visible = true;

      this.graphics.use(idleBlinkAnimation);
      this.updateTimers(engine);
    }

    if (!this._showedUp) {
      return;
    }

    this.updateIdleAnimations(engine);
  }

  resetToBlinkAnimation(engine: Game) {
    this._idleAnimationState = 'blink';
    this.graphics.use(idleBlinkAnimation);

    engine.addTimer(
      new Timer({
        fcn: () => {
          this._idleAnimationStateCanBeChanged = true;
        },
        interval: 5000
      })
    );
  }

  updateIdleAnimations(engine: Game) {
    if (this._idleAnimationState === 'meow') {
      if (idleMeowAnimation.done) {
        this.resetToBlinkAnimation(engine);
      }

      return;
    }

    if (this._idleAnimationState === 'eyes') {
      if (idleEyesAnimation.done) {
        this.resetToBlinkAnimation(engine);
      }

      return;
    }

    if (this._idleAnimationState === 'squint') {
      if (idleSquintAnimation.done) {
        this.resetToBlinkAnimation(engine);
      }

      return;
    }

    if (!this._idleAnimationStateCanBeChanged) {
      return;
    }

    /**
     * Оставляет больше шансов проиграться обычному морганию дольше
     */
    if (rand.integer(0, 100) < 50) {
      return;
    }

    /**
     * Анимации на мордочке в зависимости от состояния игрока
     */

    if (engine.player.isInHornyMode) {
      this._idleAnimationState = 'meow';
      idleMeowAnimation.reset();
      this.graphics.use(idleMeowAnimation);

      this._idleAnimationStateCanBeChanged = false;
      return;
    }

    if (engine.player.health < 25) {
      this._idleAnimationState = 'eyes';

      idleEyesAnimation.reset();
      this.graphics.use(idleEyesAnimation);

      this._idleAnimationStateCanBeChanged = false;
      return;
    }

    if (engine.player.getEffectIndexByName(BubbleWrapEffect.EFFECT_NAME) !== -1) {
      this._idleAnimationState = 'squint';

      idleSquintAnimation.reset();
      this.graphics.use(idleSquintAnimation);

      this._idleAnimationStateCanBeChanged = false;
      return;
    }
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

        this.vel.x = this._currentDirection * SPEED * engine.gameZone.currentDifficulty;
      },
      interval: 5000 / engine.gameZone.currentDifficulty,
      repeats: true
    });

    engine.currentScene.add(this._movementTimer);
    this._movementTimer.start();

    if (this._attackTimer) {
      this._attackTimer.cancel();
      engine.currentScene.removeTimer(this._attackTimer);

      this._leftPaw.deactivate();
      this._rightPaw.deactivate();
    }

    this._attackTimer = new Timer({
      fcn: () => {
        this._leftPaw.activate();
        this._rightPaw.activate();
      },
      repeats: true,
      interval: Math.max(750, 5000 / engine.gameZone.currentDifficulty)
    });

    Logger.getInstance().info('Enemy timer', engine.gameZone.currentDifficulty, 5000 / engine.gameZone.currentDifficulty);

    engine.currentScene.add(this._attackTimer);
    this._attackTimer.start();
  }
}

