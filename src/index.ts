import { Engine, Loader, DisplayMode, Physics, vec } from 'excalibur';
import { GameZone } from './scenes/gamezone/gamezone';
import { Resources } from './resources';
import { hud, loadButton, ui, updatePointsUI } from './ui-manager';

import '../template/styles.css';
import { GameOver } from './scenes/gameover/gameover';

/**
 * Managed game class
 */
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

    game.add('gamezone', this._gameZone);
    game.add('gameover', this._gameOver);

    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }

  public get player() {
    return this._gameZone.player;
  }

  public set points(val: number) {
    this._points = val;
    updatePointsUI(this._points);
  }

  public get points() {
    return this._points;
  }
}

Physics.useArcadePhysics();
Physics.acc = vec(0, 300);
Physics.gravity = vec(0, 0);

const game = new Game();
// game.start().then(() => {
//   game.goToScene('levelOne');
// });

loadButton.onclick = () => {
  game.start().then(() => {
    game.goToScene('gamezone');

    loadButton.classList.add('hide');
    hud.classList.remove('hide');
    ui.classList.remove('loading');
  });
};
