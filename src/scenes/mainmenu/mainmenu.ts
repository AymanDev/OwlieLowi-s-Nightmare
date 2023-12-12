import { Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { uiManager } from '../../ui/ui-manager';

export class MainMenu extends Scene {
  onInitialize(engine: Game): void {
    uiManager.guide.addListenerToPlayBtn(() => this.handlePlayBtn(engine));
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    uiManager.guide.show();
  }

  handlePlayBtn(engine: Game) {
    uiManager.guide.hide();

    engine.goToScene('gamezone');
  }
}
