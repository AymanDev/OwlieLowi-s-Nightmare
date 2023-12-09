import { Hud } from './hud';
import { Preload } from './preload';

class UIManager {
  private _preload = new Preload();

  private _hud = new Hud();

  public get hud() {
    return this._hud;
  }

  public get preload() {
    return this._preload;
  }
}

export const uiManager = new UIManager();
