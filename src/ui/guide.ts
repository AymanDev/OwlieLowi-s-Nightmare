import { BaseUi, ui } from './ui';

const guideEl = ui.querySelector('#guide');

const playBtn = guideEl.querySelector<HTMLButtonElement>('.startBtn');

export class Guide extends BaseUi {
  constructor() {
    super(guideEl);
  }

  addListenerToPlayBtn(callback: () => void) {
    playBtn.onclick = callback;
  }
}
