import { DisplayMode, Engine, Loader } from 'excalibur';

import { Resources } from './resources';
import { GameOver } from './scenes/gameover/gameover';
import { GameZone } from './scenes/gamezone/gamezone';
import { uiManager } from './ui/ui-manager';

export class Game extends Engine {
  private _gameZone: GameZone;
  private _gameOver: GameOver;

  private _points = 0;

  constructor() {
    super({
      width: 1280,
      height: 720,

      displayMode: DisplayMode.Fixed,
      canvasElementId: 'game',
      suppressPlayButton: true,
      antialiasing: false,
      snapToPixel: true,

      maxFps: 60
    });
  }

  public start() {
    this._gameZone = new GameZone();
    this._gameOver = new GameOver();

    this.add('gamezone', this._gameZone);
    this.add('gameover', this._gameOver);

    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }

  public get player() {
    return this._gameZone.player;
  }

  public get enemy() {
    return this._gameZone.enemy;
  }

  public set points(val: number) {
    this._points = val;

    uiManager.hud.updatePointsUI(this._points);
  }

  public get points() {
    return this._points;
  }
}