import { ImageSource, Sound } from 'excalibur';

import actorChat from './images/actor/actor_chat.png';
import actorChatUlti from './images/actor/actor_chat_ulti.png';
import actorMain from './images/actor/actor_main.png';
import actorMainSpriteSheet from './images/actor/actor_main_spritesheet.png';
import backgroundImage from './images/background.png';
import bubbleWrapImage from './images/items/bubble_wrap.png';
import fruitIceImage from './images/items/fruit_ice.png';
import mangaImage from './images/items/manga.png';
import pantsuImage from './images/items/pantsu.png';
import pearImage from './images/items/pear.png';
import vodkaImage from './images/items/vodka.png';
import eekSfx from './sounds/eek_sfx.wav';
import gameOverSound from './sounds/gameover.wav';
import gamePlayMusic from './sounds/music/gameplay.wav';
import gameStartSound from './sounds/music/gamestart.wav';
import mainMenuMusic from './sounds/music/mainmenu.wav';
import fruitIceSound from './sounds/powerups/fruit_ice.wav';
import mangaSound from './sounds/powerups/manga_powerup.wav';
import mangaSoundAlt from './sounds/powerups/manga_powerup1.wav';
import pantsuSound from './sounds/powerups/pantsu.wav';
import vodkaSound from './sounds/powerups/vodka_powerup.wav';
import alarmSfx from './sounds/sfx/alarm.wav';
import collectSound from './sounds/sfx/collect.wav';
import dashSfx from './sounds/sfx/dash.wav';
import footstepSfx from './sounds/sfx/footstep.wav';
import protectionSfx from './sounds/sfx/protection.wav';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
  BackgroundImage: new ImageSource(backgroundImage),

  ActorMain: new ImageSource(actorMain),
  ActorMainSpriteSheet: new ImageSource(actorMainSpriteSheet),

  ActorChat: new ImageSource(actorChat),
  ActorChatUlti: new ImageSource(actorChatUlti),

  MainMenuThemeMusic: new Sound(mainMenuMusic),
  GamePlayMusic: new Sound(gamePlayMusic),

  GameStartSound: new Sound(gameStartSound),

  CollectSfx: new Sound(collectSound),

  // SFX
  EekSfx: new Sound(eekSfx),
  GameOverSfx: new Sound(gameOverSound),
  FootstepSfx: new Sound(footstepSfx),
  AlarmSfx: new Sound(alarmSfx),
  DashSfx: new Sound(dashSfx),
  ProtectionSfx: new Sound(protectionSfx),

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
  PantsuSound: new Sound(pantsuSound),

  BubbleWrapImage: new ImageSource(bubbleWrapImage)
};

export { Resources };
