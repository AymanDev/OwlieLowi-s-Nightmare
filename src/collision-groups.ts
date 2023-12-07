import { CollisionGroup, CollisionGroupManager } from 'excalibur';

export const playerCollisionGroup = CollisionGroupManager.create('player');

export const damageZoneCollisionGroup = CollisionGroup.collidesWith([playerCollisionGroup]);
