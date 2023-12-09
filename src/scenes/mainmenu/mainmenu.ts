import { Scene } from 'excalibur';

import { Game } from '../../game';

export class MainMenu extends Scene {
  onInitialize(engine: Game): void {
    engine.goToScene('gamezone');
  }
}
