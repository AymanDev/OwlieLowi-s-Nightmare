import { BaseUi, ui } from './ui';
import { Resources } from '../resources';

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
    continueBtn.onclick = () => {
      Resources.UiPositiveSfx.play();

      callback();
    };
  }

  addReturnButtonListener(callback: () => void) {
    returnBtn.onclick = () => {
      Resources.UiNegativeSfx.play();

      callback();
    };
  }

  updatePointsValueUI(value: number) {
    pointsValue.textContent = value.toString();
  }

  updateTargetValueUI(value: number) {
    targetValue.textContent = value.toString();
  }
}
