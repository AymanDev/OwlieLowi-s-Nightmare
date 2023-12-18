import { Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { uiManager } from '../../ui/ui-manager';

export class MainMenu extends Scene {
  onInitialize(engine: Game): void {
    uiManager.mainMenu.addPlayBtnClickListener(() => this.handlePlayBtn(engine));

    uiManager.mainMenu.addGuideBtnClickListener(() => this.handleEnterGuideBtn());
    uiManager.guide.addListenerToExitBtn(() => this.handleExitGuideBtn());
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    uiManager.mainMenu.show();
  }

  handlePlayBtn(engine: Game) {
    uiManager.mainMenu.hide();

    engine.goToScene('gamezone');
  }

  handleEnterGuideBtn() {
    uiManager.mainMenu.hide();
    uiManager.guide.show();
  }

  handleExitGuideBtn() {
    uiManager.guide.hide();
    uiManager.mainMenu.show();
  }
}
