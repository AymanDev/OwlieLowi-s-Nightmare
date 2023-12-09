import { Engine, Scene } from 'excalibur';

import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export class GameOver extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.GameOverSfx.play(1);

    uiManager.hud.hide();
  }
}
