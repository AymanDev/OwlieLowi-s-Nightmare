import { Actor, CollisionType, EdgeCollider, Scene, Timer, vec } from 'excalibur';

import { Bonk } from '../../actors/damage-zones/bonk';
import { Hole } from '../../actors/damage-zones/hole';
import { Player } from '../../actors/player/player';
import { FruitIce } from '../../actors/powerups/fruit-ice';
import { Manga } from '../../actors/powerups/manga';
import { Pantsu } from '../../actors/powerups/pantsu';
import { Pear } from '../../actors/powerups/pear';
import { Vodka } from '../../actors/powerups/vodka';
import { Game } from '../../game';
import { uiManager } from '../../ui/ui-manager';

export const WIDTH = 1280;
export const HEIGHT = 720;
export const SCENE_PADDING = 70;

export type ObjectOnMapKey = 'hole' | 'vodka' | 'pear' | 'manga' | 'fruitIce' | 'pantsu';

export class GameZone extends Scene {
  private _objectsOnMap: Record<ObjectOnMapKey, number> = { hole: 0, vodka: 0, pear: 0, manga: 0, fruitIce: 0, pantsu: 0 };

  private _enemy = new Bonk();
  private _player = new Player();

  private _difficultyTimer: Timer;

  public onInitialize(engine: Game) {
    uiManager.hud.show();

    this.add(this._player);

    // TOP
    this.add(
      new Actor({
        pos: vec(0, 0),
        collider: new EdgeCollider({ begin: vec(0, 0), end: vec(WIDTH, 0) }),
        collisionType: CollisionType.Fixed
      })
    );
    // TOP
    this.add(
      new Actor({
        pos: vec(0, 0),
        collider: new EdgeCollider({ begin: vec(0, 200), end: vec(WIDTH, 200) }),
        collisionType: CollisionType.Fixed
      })
    );

    // BOTTOM
    this.add(
      new Actor({
        pos: vec(0, 0),
        collider: new EdgeCollider({ begin: vec(0, HEIGHT - 0), end: vec(WIDTH, HEIGHT - 0) }),
        collisionType: CollisionType.Fixed
      })
    );

    // RIGHT
    this.add(
      new Actor({
        pos: vec(0, 0),
        collider: new EdgeCollider({ begin: vec(WIDTH, 0), end: vec(WIDTH, HEIGHT - SCENE_PADDING) }),
        collisionType: CollisionType.Fixed
      })
    );

    // LEFT
    this.add(
      new Actor({
        pos: vec(0, 0),
        collider: new EdgeCollider({ begin: vec(0, 0), end: vec(0, HEIGHT) }),
        collisionType: CollisionType.Fixed
      })
    );

    this.add(this._enemy);

    this.createSpawnTimer(() => {
      this.spawnHoles(new Hole());
    }, 6000);

    this.createSpawnTimer(() => {
      this.spawnPears(new Pear());
    }, 2000);

    this.createSpawnTimer(() => {
      this.spawnVodkas(new Vodka());
    }, 15000);

    this.createSpawnTimer(() => {
      this.spawnMangas(new Manga());
    }, 20000);

    this.createSpawnTimer(() => {
      this.spawnFruitIces(new FruitIce());
    }, 15000);

    this.createSpawnTimer(() => {
      this.spawnPantsu(new Pantsu());
    }, 12500);

    this._difficultyTimer = new Timer({
      fcn: () => {
        if (engine.points < 100) {
          this._enemy.addDifficulty(engine, Math.sin(engine.points / 100));
        }
      },
      repeats: true,
      interval: 10000
    });

    this.addTimer(this._difficultyTimer);
    this._difficultyTimer.start();
  }

  public get player() {
    return this._player;
  }

  public get enemy() {
    return this._enemy;
  }

  createSpawnTimer(spawnFcn: () => void, interval: number) {
    const timer = new Timer({
      fcn: spawnFcn.bind(this),
      repeats: true,
      interval
    });

    this.add(timer);

    timer.start();
  }

  createSpawnFunction(key: ObjectOnMapKey, limit: number) {
    return (actor: Actor) => {
      if (this._objectsOnMap[key] >= limit) {
        return;
      }

      actor.on('kill', () => {
        this._objectsOnMap[key]--;
      });

      this.add(actor);

      this._objectsOnMap[key]++;
    };
  }

  spawnHoles = this.createSpawnFunction('hole', 7);
  spawnVodkas = this.createSpawnFunction('vodka', 3);
  spawnPears = this.createSpawnFunction('pear', 10);
  spawnMangas = this.createSpawnFunction('manga', 1);
  spawnFruitIces = this.createSpawnFunction('fruitIce', 1);
  spawnPantsu = this.createSpawnFunction('pantsu', 1);
}
