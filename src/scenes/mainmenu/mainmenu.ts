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

    uiManager.mainMenu.addCreditsBtnClicklistener(() => this.handleCreditsBtn());
    uiManager.credits.addReturnButtonListener(() => this.handleExitCreditsBtn());
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    Resources.MainMenuThemeMusic.play(0.05);

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

  handleCreditsBtn() {
    uiManager.mainMenu.hide();
    uiManager.credits.show();
  }

  handleExitCreditsBtn() {
    uiManager.credits.hide();
    uiManager.mainMenu.show();
  }
}
