import { BaseUi, ui } from './ui';

// const hud = ui.querySelector('#hud');

// const pointsText = hud.querySelector('#points > .value');
// const bottlesText = hud.querySelector('#bottles > .value');

// const healthText = hud.querySelector('#health > .value');

// const speedText = hud.querySelector('#speed > .value');
// const dragText = hud.querySelector('#drag > .value');

// const hornyValueElement = hud.querySelector<HTMLDivElement>('#horny > .value');

// const hornyWarningEl = hud.querySelector('#hornyWarning');

// const dashEl = hud.querySelector<HTMLDivElement>('#dash .value');

// const shiftEl = hud.querySelector('#dash > .key');

// const spacebarEl = hud.querySelector('.bottlesContainer > .key');

export class Hud extends BaseUi {
  // constructor() {
  //   super(hud);
  // }

  public updatePointsUI(points: number) {
    // pointsText.textContent = points.toString();
  }

  public updateHealthUI(health: number) {
    // healthText.textContent = health.toFixed(0);
  }

  public updateSpeedUI(speed: number) {
    // speedText.textContent = speed.toFixed(2);
  }

  public updateDragUI(drag: number) {
    // dragText.textContent = drag.toFixed(2);
  }

  public updateHornyValueUI(horny: number) {
    // hornyValueElement.style.width = `${horny}%`;
  }

  public updateBottlesValueUI(bottles: number) {
    // bottlesText.textContent = `${bottles.toFixed(2)} л`;
  }

  public showHornyWarning() {
    // hornyWarningEl.classList.remove('hide');
  }

  public hideHornyWarning() {
    // hornyWarningEl.classList.add('hide');
  }

  public updateDashCooldown(percentage: number) {
    // // dashEl.style.width = `${percentage}%`;
    // if (percentage >= 100 && !dashEl.classList.contains('ready')) {
    //   dashEl.classList.add('ready');
    //   return;
    // }
    // if (percentage <= 99 && dashEl.classList.contains('ready')) {
    //   dashEl.classList.remove('ready');
    // }
  }

  public pressShiftKey() {
    // shiftEl.classList.add('pressed');
  }

  public unpressShiftKey() {
    // shiftEl.classList.remove('pressed');
  }

  public pressSpacebarKey() {
    // spacebarEl.classList.add('pressed');
  }

  public unpressSpacebarKey() {
    // spacebarEl.classList.remove('pressed');
  }
}
