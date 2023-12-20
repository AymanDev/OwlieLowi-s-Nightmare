import { BaseUi, ui } from './ui';

const gameWinScreen = ui.querySelector('#gameWin');

const pointsValue = gameWinScreen.querySelector('.points > .value');
const targetValue = gameWinScreen.querySelector('.target > .value');

const continueBtn = gameWinScreen.querySelector<HTMLButtonElement>('.continue');
const returnBtn = gameWinScreen.querySelector<HTMLButtonElement>('.return');

export class GameWinScreen extends BaseUi {
  constructor() {
    super(gameWinScreen);
  }

  addContinueButtonListener(callback: () => void) {
    continueBtn.onclick = callback;
  }

  addReturnButtonListener(callback: () => void) {
    returnBtn.onclick = callback;
  }

  updatePointsValueUI(value: number) {
    pointsValue.textContent = value.toString();
  }

  updateTargetValueUI(value: number) {
    targetValue.textContent = value.toString();
  }
}
