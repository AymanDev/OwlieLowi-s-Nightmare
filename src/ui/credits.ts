import { BaseUi, ui } from './ui';
import { Resources } from '../resources';

// const creditsEl = ui.querySelector('#credits');

// const returnBtn = creditsEl.querySelector<HTMLButtonElement>('.backBtn');

export class CreditsUI extends BaseUi {
  // constructor() {
  //   // super(creditsEl);
  // }

  addReturnButtonListener(callback: () => void) {
    // returnBtn.onclick = () => {
    //   Resources.UiNegativeSfx.play();
    //   callback();
    // };
  }
}
