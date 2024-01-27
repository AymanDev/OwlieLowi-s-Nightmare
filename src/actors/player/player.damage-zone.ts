import { Actor, Collider, CollisionContact, CollisionType, Color, Engine, Rectangle, Shape, Side, vec } from 'excalibur';

import { Player } from './player';
import { damageEnemyCollisionGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Enemy } from '../enemies/enemy';

const SIZE = 82;

export class DamageZone extends Actor {
  private _player: Player;

  private _enemiesToKill: Enemy[] = [];

  constructor(player: Player) {
    super({
      pos: vec(0, 0),
      collider: Shape.Box(SIZE, SIZE),
      collisionType: CollisionType.Passive,
      collisionGroup: damageEnemyCollisionGroup
    });

    this._player = player;
  }

  onInitialize(engine: Game): void {
    super.onInitialize(engine);

  }

  update(engine: Engine, delta: number): void {
    if (!this._player.isDashDamaging) {
      return;
    }

    this._enemiesToKill
      .filter((enemy) => {
        const contact = enemy.collider.get().collide(this.collider.get());

        return contact.length > 0;
      })
      .forEach((enemy) => {
        enemy.die();
      });

    this._enemiesToKill = [];
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (!other.owner.hasTag('enemy')) {
      return;
    }

    const enemy = other.owner as Enemy;

    if (!this._player.isDashDamaging) {
      this._enemiesToKill.push(enemy);
      return;
    }

    enemy.die();
  }
}
