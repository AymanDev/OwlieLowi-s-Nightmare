import { Actor, CollisionType, Color, Engine, Keys, Logger, Shape, vec } from 'excalibur';

import { Resources } from '../../resources';
import { playerCollisionGroup } from '../../collision-groups';
import { updateDragUI, updateHealthUI, updateSpeedUI } from '../../ui-manager';
import { Game } from '../..';

const SPEED = 200;
const DRAG = 15;

export class Player extends Actor {
  public health = 100;

  public isDead = false;

  private _speedModificator = 1;
  private _dragModificator = 1;

  constructor() {
    super({
      pos: vec(1280 / 2, 720 / 2),
      width: 25,
      height: 25,
      color: new Color(0, 0, 0),

      collider: Shape.Box(128, 128),
      collisionType: CollisionType.Active,
      collisionGroup: playerCollisionGroup
    });
  }

  public get speedModificator() {
    return this._speedModificator;
  }

  public set speedModificator(value: number) {
    this._speedModificator = value;

    updateSpeedUI(value);
  }

  public get dragModificator() {
    return this._dragModificator;
  }

  public set dragModificator(value: number) {
    this._dragModificator = value;

    updateDragUI(value);
  }

  onInitialize() {
    this.health = 100;

    this.graphics.use(Resources.ActorMain.toSprite());
  }

  damage(damage: number) {
    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
      return;
    }

    this.health -= damage;

    updateHealthUI(this.health);
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

    this.applyDrag();
    this.updateInputs(engine);
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

    if (keys.some((key) => engine.input.keyboard.isHeld(key))) {
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

      xVel *= this.speedModificator;
      yVel *= this.speedModificator;

      this.vel.x = xVel;
      this.vel.y = yVel;
    }
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
  }
}
