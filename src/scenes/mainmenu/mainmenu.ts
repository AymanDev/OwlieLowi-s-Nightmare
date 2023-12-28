import { Random, Scene, SceneActivationContext } from 'excalibur';

import { Game } from '../../game';
import { getLastSavedTarget } from '../../progression';
import { Resources } from '../../resources';
import { uiManager } from '../../ui/ui-manager';

const phrases = [
  'Terraria и Minecraft<br />уже так умеют (╥_╥)',
  '"А как сосать?"<br/> из золотого фонда<br/> цитат Owlie<br/> ٩(ˊᗜˋ*)و',
  'Говорят создатель,<br/> хочет жену,<br/>однако на кошках<br/> жениться нельзя<br/> ฅ(ﾐᗜᆽᗜﾐ)∫',
  '"Я клоун" - частота<br/> этой фразы<br/> значительно выросла<br/> у создателя<br/> за 2023 год<br/> (｡´･●･`｡)',
  'Игра была создана<br/> за месяц!<br/> ( ⊙‿⊙)',
  'Есть слух, что<br/> Совы едят насекомых.<br/> Однако эта Сова<br/> их боится<br/> (◕‸◕ )',
  'Тут птичка нашептала,<br/> что в игре должны<br/> были быть тентакли<br/> ಠ_ಠ',
  'А еще должна<br/> была быть лягушка,<br/> но они не пугают<br/> _(°︿°)_',
  'Ветер надул на ушко,<br/> что есть еще идеи<br/> для других игр<br/> o(*ﾟ▽ﾟ*)o'
];

const rand = new Random();

export class MainMenu extends Scene {
  onInitialize(engine: Game): void {
    uiManager.mainMenu.addPlayBtnClickListener(() => this.handlePlayBtn(engine));

    uiManager.mainMenu.addGuideBtnClickListener(() => this.handleEnterGuideBtn());
    uiManager.guide.addListenerToExitBtn(() => this.handleExitGuideBtn());

    uiManager.mainMenu.addCreditsBtnClicklistener(() => this.handleCreditsBtn());
    uiManager.credits.addReturnButtonListener(() => this.handleExitCreditsBtn());

    uiManager.mainMenu.addMemeSignClickListener(() => this.updatePhrase());
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    this.updatePhrase();
    // uiManager.mainMenu.updateMemeSignText(phrases[5]);

    Resources.MainMenuThemeMusic.play(0.05);

    uiManager.mainMenu.show();
    uiManager.mainMenu.updateTargetValueUI(getLastSavedTarget());
  }

  updatePhrase() {
    const phrase = phrases[rand.integer(0, phrases.length - 1)];

    uiManager.mainMenu.updateMemeSignText(phrase);
  }

  handlePlayBtn(engine: Game) {
    Resources.MainMenuThemeMusic.stop();

    uiManager.mainMenu.hide();

    engine.restart();
  }

  handleEnterGuideBtn() {
    uiManager.mainMenu.hide();
    uiManager.guide.show();
  }

  handleExitGuideBtn() {
    uiManager.guide.hide();
    uiManager.mainMenu.show();
  }

  handleCreditsBtn() {
    uiManager.mainMenu.hide();
    uiManager.credits.show();
  }

  handleExitCreditsBtn() {
    uiManager.credits.hide();
    uiManager.mainMenu.show();
  }
}
