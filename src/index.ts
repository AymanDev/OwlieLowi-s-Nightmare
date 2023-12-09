import '../template/styles/ui.scss';

import { Physics, vec } from 'excalibur';

import { Game } from './game';
import { Resources } from './resources';
import { uiManager } from './ui/ui-manager';

Physics.useArcadePhysics();
Physics.acc = vec(0, 0);
Physics.gravity = vec(0, 0);

const game = new Game();

uiManager.preload.addPlayButtonClickListener(() => {
  game.start().then(() => {
    game.goToScene('mainmenu');

    uiManager.preload.hide();

    // Resources.MainThemeMusic.volume = 0.1;
    Resources.GameStartSound.play(0.5);
    // Resources.MainThemeMusic.play(0.01);
    // Resources.MainThemeMusic.on('playbackend', () => {
    // Resources.MainThemeMusic.play(0.1);
    // });
  });
});
