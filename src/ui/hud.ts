import { BaseUi, ui } from './ui';

const hud = ui.querySelector('#hud');

const pointsText = hud.querySelector('#points > .value');
const healthText = hud.querySelector('#health > .value');

const speedText = hud.querySelector('#speed > .value');
const dragText = hud.querySelector('#drag > .value');

const hornyValueElement = hud.querySelector<HTMLDivElement>('#horny > .value');

export class Hud extends BaseUi {
  constructor() {
    super(hud);
  }

  public updatePointsUI(points: number) {
    pointsText.textContent = points.toString();
  }

  public updateHealthUI(health: number) {
    healthText.textContent = health.toString();
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
}
