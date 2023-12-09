import { BaseUi, ui } from './ui';

const gameOverScreen = ui.querySelector('#gameOver');
const pointsText = gameOverScreen.querySelector('.points > .value');
const restartBtnEl = gameOverScreen.querySelector<HTMLButtonElement>('#restart');

export class GameOverScreen extends BaseUi {
  constructor() {
    super(gameOverScreen);
  }

  updateFinalPoints(value: number) {
    pointsText.textContent = value.toString();
  }

  addRestartButtonListener(callback: () => void) {
    restartBtnEl.onclick = callback;
  }
}
