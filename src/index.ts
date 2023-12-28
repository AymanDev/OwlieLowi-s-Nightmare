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

// eslint-disable-next-line no-console
console.log(
  '%cCreated with love by KingoSawada',
  `background-color:rgba(0, 255, 64, 0.25); padding: 40px 10px; font-weight: 900; font-size: 18px; line-height: 20px; border-radius: 5px`
);

// eslint-disable-next-line no-console
console.log(
  '%cThanks Owlielowi for inspiration',
  `background-color:rgba(128, 128, 255, 0.5); padding: 40px 10px; font-weight: 900; font-size: 18px; line-height: 20px; border-radius: 5px`
);

// eslint-disable-next-line no-console
console.log(
  '%cCheckout http://owlielowi.korekuta.ru/?debug=1 for debug mode',
  // eslint-disable-next-line max-len
  `background-color:rgba(255, 64, 64, 0.5); padding: 40px 10px; font-weight: 900; font-size: 18px; line-height: 20px; border-radius: 5px; text-align: center`
);
