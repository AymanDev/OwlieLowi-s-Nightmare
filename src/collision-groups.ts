import { CollisionGroup, CollisionGroupManager } from 'excalibur';

export const playerCollisionGroup = CollisionGroupManager.create('player');

export const damagePlayerCollisionGroup = CollisionGroup.collidesWith([playerCollisionGroup]);

export const enemyGroup = CollisionGroupManager.create('enemy');

export const damageEnemyCollisionGroup = CollisionGroup.collidesWith([enemyGroup]);