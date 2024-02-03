import { Physics, vec } from 'excalibur';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Root } from './ui/components/Root';

Physics.useArcadePhysics();
Physics.acc = vec(0, 0);
Physics.gravity = vec(0, 0);
Physics.dynamicTreeVelocityMultiplier = 10;
Physics.checkForFastBodies = true;
Physics.disableMinimumSpeedForFastBody = true;

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(<Root />);

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
