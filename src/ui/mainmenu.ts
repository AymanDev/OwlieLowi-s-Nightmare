import { BaseUi, ui } from './ui';

const mainMenuScreen = ui.querySelector('#mainMenu');

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
}
