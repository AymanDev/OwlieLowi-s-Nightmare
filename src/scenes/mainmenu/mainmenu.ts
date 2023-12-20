import { Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { getLastSavedTarget } from '../../progression';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export class MainMenu extends Scene {
  onInitialize(engine: Game): void {
    uiManager.mainMenu.addPlayBtnClickListener(() => this.handlePlayBtn(engine));

    uiManager.mainMenu.addGuideBtnClickListener(() => this.handleEnterGuideBtn());
    uiManager.guide.addListenerToExitBtn(() => this.handleExitGuideBtn());
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    Resources.MainMenuThemeMusic.play(0.1);

    uiManager.mainMenu.show();
    uiManager.mainMenu.updateTargetValueUI(getLastSavedTarget());
  }

  handlePlayBtn(engine: Game) {
    Resources.MainMenuThemeMusic.stop();

    uiManager.mainMenu.hide();

    engine.restart();
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
