import { BaseUi, ui } from './ui';
import { Resources } from '../resources';

const mainMenuScreen = ui.querySelector('#mainMenu');

const targetValue = mainMenuScreen.querySelector('.target > .value');

const playBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.play');

const guideBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.guide');

const creditsBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.credits');

export class MainMenuScreen extends BaseUi {
  constructor() {
    super(mainMenuScreen);
  }

  addPlayBtnClickListener(callback: () => void) {
    playBtn.onclick = callback;
  }

  addGuideBtnClickListener(callback: () => void) {
    guideBtn.onclick = () => {
      Resources.UiPositiveSfx.play();

      callback();
    };
  }

  addCreditsBtnClicklistener(callback: () => void) {
    creditsBtn.onclick = () => {
      Resources.UiPositiveSfx.play();

      callback();
    };
  }

  updateTargetValueUI(value: number) {
    targetValue.textContent = value.toString();
  }
}
