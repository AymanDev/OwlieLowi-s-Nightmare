import { Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { getLastSavedTarget, progressToNextTarget } from '../../progression';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export class GameWin extends Scene {
  onInitialize(engine: Game): void {
    uiManager.gameWin.addContinueButtonListener(() => this.onContinue(engine));
    uiManager.gameWin.addReturnButtonListener(() => this.onReturn(engine));
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    Resources.GamePlayMusic.stop();
    Resources.GameWinSfx.play(0.25);
    Resources.GameWinMusic.play(0.1);

    uiManager.hud.hide();
    uiManager.gameWin.show();

    const lastTarget = getLastSavedTarget();

    uiManager.gameWin.updatePointsValueUI(lastTarget);

    progressToNextTarget(lastTarget);

    uiManager.gameWin.updateTargetValueUI(getLastSavedTarget());
  }

  onContinue(engine: Game) {
    Resources.GamePlayMusic.stop();
    Resources.GameWinMusic.stop();

    uiManager.gameWin.hide();

    engine.restart();
  }

  onReturn(engine: Game) {
    Resources.GamePlayMusic.stop();
    Resources.GameWinMusic.stop();

    uiManager.gameWin.hide();

    engine.goToScene('mainmenu');
  }
}
