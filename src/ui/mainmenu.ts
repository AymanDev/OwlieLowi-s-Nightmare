import { BaseUi, ui } from './ui';

const mainMenuScreen = ui.querySelector('#mainMenu');

const targetValue = mainMenuScreen.querySelector('.target > .value');

const playBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.play');

const guideBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.guide');

export class MainMenuScreen extends BaseUi {
  constructor() {
    super(mainMenuScreen);
  }

  addPlayBtnClickListener(callback: () => void) {
    playBtn.onclick = callback;
  }

  addGuideBtnClickListener(callback: () => void) {
    guideBtn.onclick = callback;
  }

  updateTargetValueUI(value: number) {
    targetValue.textContent = value.toString();
  }
}
