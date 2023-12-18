import { GameOverScreen } from './gameover';
import { GameWinScreen } from './gamewin';
import { Guide } from './guide';
import { Hud } from './hud';
import { MainMenuScreen } from './mainmenu';
import { Preload } from './preload';
import { MainMenu } from '../scenes/mainmenu/mainmenu';

class UIManager {
  private _preload = new Preload();

  private _hud = new Hud();

  private _gameOver = new GameOverScreen();

  private _guide = new Guide();

  private _gameWin = new GameWinScreen();

  private _mainMenu = new MainMenuScreen();

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

  public get gameWin() {
    return this._gameWin;
  }

  public get mainMenu() {
    return this._mainMenu;
  }
}

export const uiManager = new UIManager();
