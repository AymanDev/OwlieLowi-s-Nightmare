import { DisplayMode, Engine, Loader } from 'excalibur';

import { Resources } from './resources';
import { GameOver } from './scenes/gameover/gameover';
import { GameZone } from './scenes/gamezone/gamezone';
import { MainMenu } from './scenes/mainmenu/mainmenu';
import { uiManager } from './ui/ui-manager';

export class Game extends Engine {
  private _mainMenu: MainMenu;
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
    this._mainMenu = new MainMenu();
    this._gameZone = new GameZone(this);
    this._gameOver = new GameOver();

    this.add('mainmenu', this._mainMenu);
    this.add('gamezone', this._gameZone);
    this.add('gameover', this._gameOver);

    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }

  public resetGameData() {
    this.points = 0;

    this.remove(this._gameZone);
    this._gameZone = new GameZone(this);

    this.add('gamezone', this._gameZone);
  }

  public restart() {
    this.resetGameData();

    this.goToScene('gamezone');
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

  public get gameZone() {
    return this._gameZone;
  }
}
