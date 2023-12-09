import { ImageSource, Sound } from 'excalibur';

import actorChat from './images/actor/actor_chat.png';
import actorMain from './images/actor/actor_main.png';
import fruitIceImage from './images/items/fruit_ice.png';
import mangaImage from './images/items/manga.png';
import pantsuImage from './images/items/pantsu.png';
import pearImage from './images/items/pear.png';
import vodkaImage from './images/items/vodka.png';
import eekSfx from './sounds/eek_sfx.wav';
import gameOverSound from './sounds/gameover.wav';
import mainThemeMusic from './sounds/music/main.wav';
import fruitIceSound from './sounds/powerups/fruit_ice.wav';
import mangaSound from './sounds/powerups/manga_powerup.wav';
import mangaSoundAlt from './sounds/powerups/manga_powerup1.wav';
import pantsuSound from './sounds/powerups/pantsu.wav';
import vodkaSound from './sounds/powerups/vodka_powerup.wav';
import collectSound from './sounds/sfx/collect.wav';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
  ActorMain: new ImageSource(actorMain),
  ActorChat: new ImageSource(actorChat),

  MainThemeMusic: new Sound(mainThemeMusic),

  CollectSfx: new Sound(collectSound),

  // SFX
  EekSfx: new Sound(eekSfx),

  GameOverSfx: new Sound(gameOverSound),

  // Items
  VodkaImage: new ImageSource(vodkaImage),
  VodkaSound: new Sound(vodkaSound),

  MangaImage: new ImageSource(mangaImage),
  MangaSound: new Sound(mangaSound),
  MangaSoundAlt: new Sound(mangaSoundAlt),

  PearImage: new ImageSource(pearImage),

  FruitIceImage: new ImageSource(fruitIceImage),
  FruitIceSound: new Sound(fruitIceSound),

  PantsuImage: new ImageSource(pantsuImage),
  PantsuSound: new Sound(pantsuSound)
};

export { Resources };
