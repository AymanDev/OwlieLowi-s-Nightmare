import '../template/styles/ui.scss';

import { DevTool } from '@excaliburjs/dev-tools';
import { Physics, vec } from 'excalibur';

import { Game } from './game';
import { Resources } from './resources';
import { uiManager } from './ui/ui-manager';

Physics.useArcadePhysics();
Physics.acc = vec(0, 0);
Physics.gravity = vec(0, 0);
Physics.dynamicTreeVelocityMultiplier = 3;

const game = new Game();

uiManager.preload.addPlayButtonClickListener(() => {
  uiManager.preload.disable();

  game.start().then(() => {
    Resources.GameInitSfx.play();

    game.goToScene('mainmenu');

    uiManager.preload.hide();
  });
});

const query = new URLSearchParams(window.location.search);

export const IS_DEBUG = Boolean(query.get('debug'));

if (IS_DEBUG) {
  const devtool = new DevTool(game);
}
