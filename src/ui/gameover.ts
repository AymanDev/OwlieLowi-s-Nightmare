import { BaseUi, ui } from './ui';
import { Resources } from '../resources';

// const gameOverScreen = ui.querySelector('#gameOver');
// const pointsText = gameOverScreen.querySelector('.points > .value');
// const restartBtnEl = gameOverScreen.querySelector<HTMLButtonElement>('#restart');
// const returnBtnEl = gameOverScreen.querySelector<HTMLButtonElement>('#return');

export class GameOverScreen extends BaseUi {
  // constructor() {
  //   super(gameOverScreen);
  // }

  updateFinalPoints(value: number) {
    // pointsText.textContent = value.toString();
  }

  addRestartButtonListener(callback: () => void) {
    // restartBtnEl.onclick = () => {
    //   Resources.UiPositiveSfx.play();
    //   callback();
    // };
  }

  addReturnButtonListener(callback: () => void) {
    // returnBtnEl.onclick = () => {
    //   Resources.UiNegativeSfx.play();
    //   callback();
    // };
  }
}
