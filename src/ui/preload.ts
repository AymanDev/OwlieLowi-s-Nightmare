import { BaseUi, ui } from './ui';

const loadButton = ui.querySelector<HTMLDivElement>('.buttonContainer');

const playBtn = loadButton.querySelector('#playBtn');

export class Preload extends BaseUi {
  constructor() {
    super(loadButton);
  }

  public addPlayButtonClickListener(callback: () => void) {
    loadButton.onclick = () => {
      playBtn.textContent = 'Игра загружается...';
      playBtn.classList.add('loadingBtn');

      callback();
    };
  }

  public override hide(): void {
    super.hide();

    loadButton.classList.add('hide');
    ui.classList.remove('loading');
  }
}
