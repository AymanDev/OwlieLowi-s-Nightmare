import { Actor, ActorArgs, Animation, CollisionType, Shape, Timer, Trigger, Vector, vec } from 'excalibur';

import { IS_DEBUG } from '../..';
import { enemyGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { getRandomPositionWithinPlayableSpace } from '../../scenes/gamezone/gamezone.utils';

const SIZE = 64;

export class Enemy extends Actor {
  private _isDead = false;
  private _isDeathAnimationStarted = false;

  private _canAttack = true;

  constructor(
    private _speed: number,
    private _deathAnimation: Animation,
    args?: ActorArgs
  ) {
    super({
      width: SIZE,
      height: SIZE,

      pos: getRandomPositionWithinPlayableSpace(),

      collider: Shape.Box(SIZE, SIZE),
      collisionGroup: enemyGroup,
      collisionType: CollisionType.Passive,

      z: 9,
      ...args
    });
  }

  onInitialize(engine: Game): void {
    super.onInitialize(engine);

    this.addTag('enemy');

    this.addChild(
      new Trigger({
        width: SIZE,
        height: SIZE,
        pos: vec(0, 0),

        visible: IS_DEBUG,

        target: engine.player,

        action: () => {
          if (!engine.player.isDashDamaging && this._canAttack && !this.isDead) {
            this.onDamage(engine);
          }
        }
      })
    );
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);

    if (this._isDead) {
      if (!this._isDeathAnimationStarted) {
        this._isDeathAnimationStarted = true;

        this._deathAnimation.reset();
        this.graphics.use(this._deathAnimation);
        this.onDead(engine);
        return;
      }

      if (this._isDeathAnimationStarted && this._deathAnimation.done) {
        this.actions.fade(0, 1000).die();
        return;
      }

      return;
    }

    const dir = engine.player.pos.sub(this.pos);

    this.updateScale(dir);

    this.vel = dir.normalize().scale(this._speed);
  }

  updateScale(dir: Vector) {
    if (dir.x > 0 && this.scale.x !== -1) {
      this.scale = vec(-1, 1);
    }

    if (dir.x < 0 && this.scale.x !== 1) {
      this.scale = vec(1, 1);
    }
  }

  die() {
    Resources.DamageSfx.play();

    this._isDead = true;
    this.vel = vec(0, 0);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function -- callback for extenders
  onDead(engine:Game) {}

  onDamage(engine: Game) {
    this._canAttack = false;

    const cooldownTimer = new Timer({
      fcn: () => {
        this._canAttack = true;
      },
      interval: 1000
    });

    engine.currentScene.addTimer(cooldownTimer);

    cooldownTimer.start();
  }

  public get isDead() {
    return this._isDead;
  }
}
