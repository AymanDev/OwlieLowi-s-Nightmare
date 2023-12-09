import { Actor, CollisionType, EdgeCollider, Logger, Scene, SceneActivationContext, Timer, vec } from 'excalibur';

import { Bonk } from '../../actors/damage-zones/bonk';
import { Hole } from '../../actors/damage-zones/hole';
import { Player } from '../../actors/player/player';
import { FruitIce } from '../../actors/powerups/fruit-ice';
import { Manga } from '../../actors/powerups/manga';
import { Pantsu } from '../../actors/powerups/pantsu';
import { Pear } from '../../actors/powerups/pear';
import { Vodka } from '../../actors/powerups/vodka';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export const WIDTH = 1280;
export const HEIGHT = 720;
export const SCENE_PADDING = 70;

const mapKeys = ['hole', 'vodka', 'pear', 'manga', 'fruitIce', 'pantsu'] as const;

export type ObjectOnMapKey = (typeof mapKeys)[number];

type ObjectsOnMap = Record<ObjectOnMapKey, number>;

type ActiveTimers = Partial<Record<ObjectOnMapKey, Timer>>;

export class GameZone extends Scene {
  private _objectsOnMap: ObjectsOnMap;
  private _activeTimers: ActiveTimers = {};

  private _enemy = new Bonk();
  private _player = new Player();

  private _difficultyTimer: Timer;
  private _currentDifficulty = 1;

  public onInitialize(engine: Game) {
    Resources.GamePlayMusic.stop();
    Resources.GamePlayMusic.play(0.15);

    this._currentDifficulty = 1;

    const objectKeys = mapKeys.reduce<Partial<ObjectsOnMap>>((acc, key) => {
      return { ...acc, [key]: 0 };
    }, {});

    this._objectsOnMap = objectKeys as ObjectsOnMap;

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

    this._difficultyTimer = new Timer({
      fcn: () => {
        if (engine.points < 100) {
          this._currentDifficulty += Math.sin(engine.points / 100);

          this.enemy.updateTimers(engine);
          this.updateSpawnTimers();
        }
      },
      repeats: true,
      interval: 21000
    });

    this.addTimer(this._difficultyTimer);
    this._difficultyTimer.start();

    this.updateSpawnTimers();
  }

  public get player() {
    return this._player;
  }

  public get enemy() {
    return this._enemy;
  }

  public get currentDifficulty() {
    return this._currentDifficulty;
  }

  updateSpawnTimers() {
    this.createSpawnTimer(
      'hole',
      () => {
        this.spawnHoles(new Hole());
      },
      Math.max(500, 1500 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'pear',
      () => {
        this.spawnPears(new Pear());
      },
      Math.max(500, 1000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'vodka',
      () => {
        this.spawnVodkas(new Vodka());
      },
      Math.max(10000, 15000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'manga',
      () => {
        this.spawnMangas(new Manga());
      },
      Math.max(10000, 30000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'fruitIce',
      () => {
        this.spawnFruitIces(new FruitIce());
      },
      Math.max(5000, 15000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'pantsu',
      () => {
        this.spawnPantsu(new Pantsu());
      },
      Math.max(7500, 12500 / this.currentDifficulty)
    );
  }

  createSpawnTimer(type: ObjectOnMapKey, spawnFcn: () => void, interval: number) {
    if (this._activeTimers[type]) {
      // // Timer has not completed atleast once
      // if (this._objectsOnMap[type] === 0) {
      //   Logger.getInstance().info('Cant create timer', type, 'it does not spawned once');

      //   return;
      // }

      const activeTimer = this._activeTimers[type];
      // activeTimer.complete

      this.cancelTimer(this._activeTimers[type]);
    }

    const timer = new Timer({
      fcn: spawnFcn.bind(this),
      repeats: true,
      interval
    });

    this.add(timer);

    timer.start();

    this._activeTimers[type] = timer;

    Logger.getInstance().info('created active spawn timer for', type, 'with interval', interval);

    return timer;
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

  spawnHoles = this.createSpawnFunction('hole', 12);
  spawnVodkas = this.createSpawnFunction('vodka', 3);
  spawnPears = this.createSpawnFunction('pear', 20);
  spawnMangas = this.createSpawnFunction('manga', 1);
  spawnFruitIces = this.createSpawnFunction('fruitIce', 1);
  spawnPantsu = this.createSpawnFunction('pantsu', 1);
}
