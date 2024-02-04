import { Actor, CollisionType, EdgeCollider, Engine, Logger, Scene, SceneActivationContext, Shape, Timer, Vector, vec } from 'excalibur';

import { Cat } from '../../actors/damage-zones/enemy/cat';
import { Fly } from '../../actors/enemies/fly/fly';
import { Goblin } from '../../actors/enemies/goblin/goblin';
import { SmallAbomination } from '../../actors/enemies/small-abominaton/small-abomination';
import { Player } from '../../actors/player/player';
import { Banana } from '../../actors/powerups/banana';
import { BubbleWrap } from '../../actors/powerups/bubble-wrap';
import { Crocus } from '../../actors/powerups/crocus';
import { FruitIce } from '../../actors/powerups/fruit-ice';
import { Manga } from '../../actors/powerups/manga';
import { Pantsu } from '../../actors/powerups/pantsu';
import { Vodka } from '../../actors/powerups/vodka';
import { damagePlayerCollisionGroup } from '../../collision-groups';
import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export const SCENE_WIDTH = 1280;
export const SCENE_HEIGHT = 720;
export const SCENE_PADDING = 70;

const mapKeys = [
  'hole',
  'vodka',
  'banana',
  'manga',
  'fruit-ice',
  'pantsu',
  'bubble-wrap',
  'crocus',
  'fly',
  'small-abomination',
  'goblin'
] as const;

export type ObjectOnMapKey = (typeof mapKeys)[number];

type ObjectsOnMap = Record<ObjectOnMapKey, number>;

type ActiveTimers = Partial<Record<ObjectOnMapKey, Timer>>;

export class GameZone extends Scene {
  private _objectsOnMap: ObjectsOnMap;
  private _activeTimers: ActiveTimers = {};

  private _enemy: Cat;
  private _player: Player;

  private _difficultyTimer: Timer;
  private _currentDifficulty = 1;

  constructor(engine: Game) {
    super();

    this._enemy = new Cat();
    this._player = new Player(engine);
  }

  public onInitialize(engine: Game) {
    this.setupBackground(engine);

    Resources.GameStartSound.play();

    Resources.GamePlayMusic.stop();
    Resources.GamePlayMusic.play(0.05);

    Resources.WindSfx.play(0.01);

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
        collider: new EdgeCollider({ begin: vec(0, 0), end: vec(SCENE_WIDTH, 0) }),
        collisionType: CollisionType.Fixed
      })
    );
    // TOP
    this.add(
      new Actor({
        pos: vec(SCENE_WIDTH / 2, 64),
        collider: Shape.Box(SCENE_WIDTH + 512, 512),
        collisionType: CollisionType.Fixed,
        collisionGroup: damagePlayerCollisionGroup
      })
    );

    // BOTTOM
    this.add(
      new Actor({
        pos: vec(SCENE_WIDTH / 2, SCENE_HEIGHT + 256),
        collider: Shape.Box(SCENE_WIDTH + 256, 512),
        collisionType: CollisionType.Fixed
      })
    );

    // RIGHT
    this.add(
      new Actor({
        pos: vec(SCENE_WIDTH + 256, SCENE_HEIGHT / 2),
        collider: Shape.Box(512, SCENE_HEIGHT + 512),
        collisionType: CollisionType.Fixed
      })
    );

    // LEFT
    this.add(
      new Actor({
        pos: vec(-256, SCENE_HEIGHT / 2),
        collider: Shape.Box(512, SCENE_HEIGHT + 512),
        collisionType: CollisionType.Fixed
      })
    );

    this.add(this._enemy);

    this._difficultyTimer = new Timer({
      fcn: () => {
        if (engine.points < 500) {
          this._currentDifficulty += Math.sin(engine.points / 75);

          Logger.getInstance().info('increasing diff', this.currentDifficulty);

          this.enemy.updateTimers(engine);
          this.updateSpawnTimers();
        }
      },
      repeats: true,
      interval: 30000
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
    // this.createSpawnTimer(
    //   'hole',
    //   () => {
    //     this.spawnHoles(new Hole());
    //   },
    //   Math.max(500, 1500 / this.currentDifficulty)
    // );

    this.createSpawnTimer(
      'banana',
      () => {
        this.spawnBanana(new Banana());
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
      'fruit-ice',
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

    this.createSpawnTimer(
      'bubble-wrap',
      () => {
        this.spawnBubbleWraps(new BubbleWrap());
      },
      Math.max(20000, 28000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'crocus',
      () => {
        this.spawnCrocus(new Crocus());
      },
      Math.max(27000, 29000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'fly',
      () => {
        this.spawnFlys(new Fly());
      },
      Math.max(3000, 4000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'small-abomination',
      () => {
        this.spawnSmallAbomination(new SmallAbomination());
      },
      Math.max(5000, 5000 / this.currentDifficulty)
    );

    this.createSpawnTimer(
      'goblin',
      () => {
        if (this.currentDifficulty > 2) {
          this.spawnGoblin(new Goblin());
        }
      },
      Math.max(3000, 4000 / this.currentDifficulty)
    );
  }

  createSpawnTimer(type: ObjectOnMapKey, spawnFcn: () => void, interval: number) {
    if (this._activeTimers[type]) {
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

  // spawnHoles = this.createSpawnFunction('hole', 12);
  spawnVodkas = this.createSpawnFunction('vodka', 3);
  spawnBanana = this.createSpawnFunction('banana', 20);
  spawnMangas = this.createSpawnFunction('manga', 1);
  spawnFruitIces = this.createSpawnFunction('fruit-ice', 1);
  spawnPantsu = this.createSpawnFunction('pantsu', 1);
  spawnBubbleWraps = this.createSpawnFunction('bubble-wrap', 1);
  spawnCrocus = this.createSpawnFunction('crocus', 1);
  spawnFlys = this.createSpawnFunction('fly', 10);
  spawnSmallAbomination = this.createSpawnFunction('small-abomination', 15);
  spawnGoblin = this.createSpawnFunction('goblin', 20);

  setupBackground(engine: Game) {
    const actor = new Actor({
      x: 0,
      y: 0,

      width: engine.screen.resolution.width,
      height: engine.screen.resolution.height,
      collisionType: CollisionType.PreventCollision
    });

    actor.z = -99;
    actor.graphics.anchor = Vector.Zero;

    const sprite = Resources.BackgroundImage.toSprite();
    sprite.destSize.width = engine.screen.resolution.width;
    sprite.destSize.height = engine.screen.resolution.height;

    actor.graphics.use(sprite);

    this.add(actor);
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);

    const pos = engine.player.pos;

    if (pos.x < 9) {
      engine.player.pos.x = 10;
    }

    if (pos.x > 1270) {
      engine.player.pos.x = 1270;
    }

    if (pos.y < 310) {
      engine.player.pos.y = 310;
    }

    if (pos.y > 690) {
      engine.player.pos.y = 690;
    }

    if (engine.points >= engine.target) {
      engine.goToScene('gamewin');
    }
  }
}
