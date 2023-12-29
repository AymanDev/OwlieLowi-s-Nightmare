import { ImageSource, Sound } from 'excalibur';

import actorChat from './images/actor/actor_chat.png';
import actorChatUlti from './images/actor/actor_chat_ulti.png';
import actorMain from './images/actor/actor_main.png';
import actorMainSpriteSheet from './images/actor/actor_main_spritesheet.png';
import enemyIdleSpriteSheet from './images/actor/enemy/enemy_idle.png';
import enemyShowupSpriteSheet from './images/actor/enemy/enemy_showup.png';
import enemyPawAttackSpriteSheet from './images/actor/enemy/paw_attack.png';
import flyDeathSpritesheet from './images/actor/fly/m11_Dead_Ground.png';
import flyIdleSpritesheet from './images/actor/fly/m11_Idle.png';
import abominationDeathSpritesheet from './images/actor/small_abomination/m13_Dead.png';
import abominationIdleSpritesheet from './images/actor/small_abomination/m13_Idle.png';
import backgroundImage from './images/background.png';
import bananaImage from './images/items/banana.png';
import bubbleWrapImage from './images/items/bubble_wrap.png';
import fruitIceImage from './images/items/fruit_ice.png';
import mangaImage from './images/items/manga.png';
import pantsuImage from './images/items/pantsu.png';
import pearImage from './images/items/pear.png';
import vodkaImage from './images/items/vodka.png';
import shiftKeySpritesheet from './images/ui/keys/SHIFT.png';
import spaceBarSpritesheet from './images/ui/keys/SPACEALTERNATIVE.png';
import eekSfx from './sounds/eek_sfx.wav';
import gameOverSound from './sounds/gameover.wav';
import gameWinSfx from './sounds/gamewin.wav';
import brokenTensionMusic from './sounds/music/Broken Tension 200BPM 3over4.wav';
import spiritLifterMusic from './sounds/music/Spirit Lifter 172 BPM.wav';
import gameStartSound from './sounds/music/gamestart.wav';
import gameWinMusic from './sounds/music/gamewin.wav';
import fruitIceSound from './sounds/powerups/fruit_ice.wav';
import mangaSound from './sounds/powerups/manga_powerup.wav';
import mangaSoundAlt from './sounds/powerups/manga_powerup1.wav';
import pantsuSound from './sounds/powerups/pantsu.wav';
import vodkaSound from './sounds/powerups/vodka_powerup.wav';
import alarmSfx from './sounds/sfx/alarm.wav';
import abominationDeathSfx from './sounds/sfx/enemy/sfx_abomination_death.wav';
import damageSfx from './sounds/sfx/enemy/sfx_damage_minor.wav';
import flyDeathSfx from './sounds/sfx/enemy/sfx_fly_death.wav';
import protectionSfx from './sounds/sfx/protection.wav';
import uiNeutralNotificationSfx from './sounds/sfx/sfx_NeutralNotification2.wav';
import gameInitSfx from './sounds/sfx/sfx_battlemenu_init.wav';
import collectSfx from './sounds/sfx/sfx_coin_single2.wav';
import catAttackSfx from './sounds/sfx/sfx_damaged_cute.wav';
import failSfx from './sounds/sfx/sfx_fail3.wav';
import footstepSfx from './sounds/sfx/sfx_footstep2.wav';
import drinkSfx from './sounds/sfx/sfx_heal7.wav';
import dashSfx from './sounds/sfx/sfx_sweep3.wav';
import uiNegativeSfx from './sounds/sfx/sfx_ui_negative.wav';
import uiPositiveSfx from './sounds/sfx/sfx_ui_positive.wav';
import windSfx from './sounds/sfx/sfx_windy2(loop).wav';

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

  MainMenuThemeMusic: new Sound(spiritLifterMusic),
  GamePlayMusic: new Sound(brokenTensionMusic),

  GameStartSound: new Sound(gameStartSound),

  GameWinSfx: new Sound(gameWinSfx),
  GameWinMusic: new Sound(gameWinMusic),

  ShiftKeySpriteSheet: new ImageSource(shiftKeySpritesheet),
  SpacebarKeySpriteSheet: new ImageSource(spaceBarSpritesheet),

  // SFX
  EekSfx: new Sound(eekSfx),
  GameOverSfx: new Sound(gameOverSound),
  FootstepSfx: new Sound(footstepSfx),
  AlarmSfx: new Sound(alarmSfx),
  DashSfx: new Sound(dashSfx),
  ProtectionSfx: new Sound(protectionSfx),
  CollectSfx: new Sound(collectSfx),
  GameInitSfx: new Sound(gameInitSfx),
  WindSfx: new Sound(windSfx),
  DrinkSfx: new Sound(drinkSfx),
  UiPositiveSfx: new Sound(uiPositiveSfx),
  UiNegativeSfx: new Sound(uiNegativeSfx),
  FailSfx: new Sound(failSfx),
  DamageSfx: new Sound(damageSfx),
  UiNeutralNotificationSfx: new Sound(uiNeutralNotificationSfx),

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

  BubbleWrapImage: new ImageSource(bubbleWrapImage),

  BananaImage: new ImageSource(bananaImage),

  // Main enemy
  EnemyIdleSpriteSheet: new ImageSource(enemyIdleSpriteSheet),
  EnemyPawAttackSpriteSheet: new ImageSource(enemyPawAttackSpriteSheet),
  EnemyShowupSpriteSheet: new ImageSource(enemyShowupSpriteSheet),
  EnemyAttackSfx: new Sound(catAttackSfx),

  // Fly enemy
  FlyEnemyIdleSpriteSheet: new ImageSource(flyIdleSpritesheet),
  FlyEnemyDeathSpriteSheet: new ImageSource(flyDeathSpritesheet),
  FlyDeathSfx: new Sound(flyDeathSfx),

  // Abomination enemy
  SmallAbominationIdleSpriteSheet: new ImageSource(abominationIdleSpritesheet),
  SmallAbominationDeathSpriteSheet: new ImageSource(abominationDeathSpritesheet),
  SmallAbominationDeathSfx: new Sound(abominationDeathSfx)
};

// Temporary
const VOLUME = 0.15;

Resources.MainMenuThemeMusic.loop = true;
Resources.GameInitSfx.volume = VOLUME - 0.11;
Resources.GameStartSound.volume = VOLUME + 0.35;
Resources.UiPositiveSfx.volume = VOLUME;
Resources.UiNegativeSfx.volume = VOLUME;
Resources.UiNeutralNotificationSfx.volume = VOLUME;
Resources.WindSfx.loop = true;
Resources.EnemyAttackSfx.playbackRate = 0.75;
Resources.FailSfx.volume = VOLUME;
Resources.GameWinMusic.loop = true;
Resources.DamageSfx.volume = VOLUME;
Resources.FlyDeathSfx.volume = VOLUME - 0.1;
Resources.GamePlayMusic.loop = true;
Resources.GameWinMusic.loop = true;
Resources.SmallAbominationDeathSfx.volume = VOLUME;

export { Resources };
