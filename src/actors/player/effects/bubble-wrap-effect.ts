import { Effect } from './effect';

export class BubbleWrapEffect extends Effect {

  static EFFECT_NAME = 'bubble_wrap';

  constructor() {
    super(BubbleWrapEffect.EFFECT_NAME, 2000);
  }
}
