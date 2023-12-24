import '../template/styles/ui.scss';

import {DevTool} from '@excaliburjs/dev-tools';
import { Physics, vec } from 'excalibur';

import { Game } from './game';
import { uiManager } from './ui/ui-manager';

Physics.useArcadePhysics();
Physics.acc = vec(0, 0);
Physics.gravity = vec(0, 0);

const game = new Game();

uiManager.preload.addPlayButtonClickListener(() => {
  uiManager.preload.disable();

  game.start().then(() => {
    game.goToScene('mainmenu');

    uiManager.preload.hide();
  });
});

const query = new URLSearchParams(window.location.search);

if (query.get('debug')){
  const devtool = new DevTool(game);
}
