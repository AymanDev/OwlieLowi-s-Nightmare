import { BaseUi, ui } from './ui';

const guideEl = ui.querySelector('#guide');

const exitBtn = guideEl.querySelector<HTMLButtonElement>('.backBtn');

export class Guide extends BaseUi {
  constructor() {
    super(guideEl);
  }

  addListenerToExitBtn(callback: () => void) {
    exitBtn.onclick = callback;
  }
}
