import { GameOverScreen } from './gameover';
import { Guide } from './guide';
import { Hud } from './hud';
import { Preload } from './preload';

class UIManager {
  private _preload = new Preload();

  private _hud = new Hud();

  private _gameOver = new GameOverScreen();

  private _guide = new Guide();

  public get hud() {
    return this._hud;
  }

  public get preload() {
    return this._preload;
  }

  public get gameOver() {
    return this._gameOver;
  }

  public get guide() {
    return this._guide;
  }
}

export const uiManager = new UIManager();
