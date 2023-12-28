import { Actor, Engine } from 'excalibur';

import { yayAnimation } from './player.animations';

export class FakePlayer extends Actor{

  onInitialize(_engine: Engine): void {
    this.graphics.use(yayAnimation);
  }
}