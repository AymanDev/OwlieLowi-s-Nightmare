import { Effect } from './effect';

export class X2Effect extends Effect {
  static EFFECT_NAME = 'crocus';

  constructor(){
    super(X2Effect.EFFECT_NAME, 5000);
  }
}