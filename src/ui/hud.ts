import { BaseUi, ui } from './ui';

const hud = ui.querySelector('#hud');

const pointsText = hud.querySelector('#points > .value');
const bottlesText = hud.querySelector('#bottles > .value');

const healthText = hud.querySelector('#health > .value');

const speedText = hud.querySelector('#speed > .value');
const dragText = hud.querySelector('#drag > .value');

const hornyValueElement = hud.querySelector<HTMLDivElement>('#horny > .value');

const hornyWarningEl = hud.querySelector('#hornyWarning');

export class Hud extends BaseUi {
  constructor() {
    super(hud);
  }

  public updatePointsUI(points: number) {
    pointsText.textContent = points.toString();
  }

  public updateHealthUI(health: number) {
    healthText.textContent = health.toFixed(0);
  }

  public updateSpeedUI(speed: number) {
    speedText.textContent = speed.toFixed(2);
  }

  public updateDragUI(drag: number) {
    dragText.textContent = drag.toFixed(2);
  }

  public updateHornyValueUI(horny: number) {
    hornyValueElement.style.width = `${horny}%`;
  }

  public updateBottlesValueUI(bottles: number) {
    bottlesText.textContent = `${bottles.toFixed(2)} л`;
  }

  public showHornyWarning() {
    hornyWarningEl.classList.remove('hide');
  }

  public hideHornyWarning() {
    hornyWarningEl.classList.add('hide');
  }
}
