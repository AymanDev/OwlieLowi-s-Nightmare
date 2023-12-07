export const ui = document.querySelector('#ui');

export const hud = ui.querySelector('#hud');

const pointsText = hud.querySelector('#points > .value');
const healthText = hud.querySelector('#health > .value');

const speedText = hud.querySelector('#speed > .value');
const dragText = hud.querySelector('#drag > .value');

export const updatePointsUI = (points: number) => {
  pointsText.textContent = points.toString();
};

export const updateHealthUI = (health: number) => {
  healthText.textContent = health.toString();
};

export const updateSpeedUI = (speed: number) => {
  speedText.textContent = speed.toFixed(2);
};

export const updateDragUI = (drag: number) => {
  dragText.textContent = drag.toFixed(2);
};

export const loadButton = ui.querySelector<HTMLButtonElement>('.buttonContainer');
