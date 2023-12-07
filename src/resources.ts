import { ImageSource, Sound } from 'excalibur';

import actorMain from './images/actor/actor_main.png';
import actorChat from './images/actor/actor_chat.png';
import actorPear from './images/actor/actor_pear.png';

// Items
import vodkaImage from './images/items/vodka.png';
import vodkaSound from './sounds/powerups/vodka_powerup.wav';

import mangaImage from './images/actor/actor_manga.png';
import mangaSound from './sounds/powerups/manga_powerup.wav';
import mangaSoundAlt from './sounds/powerups/manga_powerup1.wav';

import sword from './images/sword.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
  Sword: new ImageSource(sword),
  ActorMain: new ImageSource(actorMain),
  ActorChat: new ImageSource(actorChat),
  ActorPear: new ImageSource(actorPear),

  //Items
  VodkaImage: new ImageSource(vodkaImage),
  VodkaSound: new Sound(vodkaSound),

  MangaImage: new ImageSource(mangaImage),
  MangaSound: new Sound(mangaSound),
  MangaSoundAlt: new Sound(mangaSoundAlt)
};

export { Resources };
