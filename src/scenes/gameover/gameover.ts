import { Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

export class GameOver extends Scene {
  onInitialize(engine: Game): void {
    Resources.GameOverSfx.play(1);

    uiManager.gameOver.addRestartButtonListener(() => this.onRestart(engine));
    uiManager.gameOver.addReturnButtonListener(() => this.onReturn(engine));
  }

  onActivate(context: SceneActivationContext<unknown>): void {
    const engine = context.engine as Game;

    uiManager.hud.hide();
    uiManager.gameOver.show();
    uiManager.gameOver.updateFinalPoints(engine.points);
  }

  onRestart(engine: Game) {
    uiManager.gameOver.hide();

    engine.restart();
  }

  onReturn(engine: Game) {
    uiManager.gameOver.hide();

    engine.resetGameData();
    engine.goToScene('mainmenu');
  }
}
