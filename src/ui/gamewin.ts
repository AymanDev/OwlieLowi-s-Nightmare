import { BaseUi, ui } from './ui';

const gameWinScreen = ui.querySelector('#gameWin');

export class GameWinScreen extends BaseUi {
  constructor() {
    super(gameWinScreen);

  }
}
