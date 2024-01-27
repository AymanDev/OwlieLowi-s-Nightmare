import { BaseUi, ui } from './ui';
import { Resources } from '../resources';

const mainMenuScreen = ui.querySelector('#mainMenu');

const targetValue = mainMenuScreen.querySelector('.target > .value');

const playBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.play');

const guideBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.guide');

const creditsBtn = mainMenuScreen.querySelector<HTMLButtonElement>('.credits');

const memeSignEl = mainMenuScreen.querySelector<HTMLDivElement>('.memeSign');

const authStatus = mainMenuScreen.querySelector<HTMLDivElement>('.authStatus');

const whatsNewEl = mainMenuScreen.querySelector<HTMLDivElement>('.whatsnew');

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

  addMemeSignClickListener(callback: () => void) {
    memeSignEl.onclick = () => {
      Resources.UiPositiveSfx.play();

      callback();
    };
  }

  updateMemeSignText(text: string) {
    memeSignEl.innerHTML = text;
  }

  setAuthStatus(connected: boolean) {
    if (connected) {
      authStatus.querySelector('.yes').classList.remove('hide');
      authStatus.querySelector('.no').classList.add('hide');
      return;
    }

    authStatus.querySelector('.yes').classList.add('hide');
    authStatus.querySelector('.no').classList.remove('hide');
  }

  showWhatsNew() {
    whatsNewEl.classList.remove('hide');
  }

  hideWhatsNew() {
    whatsNewEl.classList.add('hide');
  }

  addWhatsNewCloseClickListener(callback: () => void) {
    whatsNewEl.querySelector<HTMLDivElement>('.close').onclick = () => {
      Resources.UiPositiveSfx.play();

      callback();
    };
  }
}
