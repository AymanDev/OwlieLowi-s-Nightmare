import { GameOverScreen } from './gameover';
import { Hud } from './hud';
import { Preload } from './preload';

class UIManager {
  private _preload = new Preload();

  private _hud = new Hud();

  private _gameOver = new GameOverScreen();

  public get hud() {
    return this._hud;
  }

  public get preload() {
    return this._preload;
  }

  public get gameOver() {
    return this._gameOver;
  }
}

export const uiManager = new UIManager();
