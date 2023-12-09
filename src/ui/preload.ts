import { BaseUi, ui } from './ui';

const loadButton = ui.querySelector<HTMLButtonElement>('.buttonContainer');

export class Preload extends BaseUi {
  constructor() {
    super(loadButton);
  }

  public addPlayButtonClickListener(callback: () => void) {
    loadButton.onclick = callback;
  }

  public override hide(): void {
    super.hide();

    loadButton.classList.add('hide');
    ui.classList.remove('loading');
  }
}
