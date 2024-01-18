import { Logger } from 'excalibur';
import Cookies from 'js-cookie';

const STORAGE_KEY = 'target';

const START_TARGET = 164;

export const getLastSavedTarget = () => {
  const item = localStorage.getItem(STORAGE_KEY);

  if (!item) {
    saveTarget(START_TARGET);

    return START_TARGET;
  }

  const result = Number(item);

  const isHasBeenFirstUploaded = localStorage.getItem('firstUpload');

  if (!isHasBeenFirstUploaded) {
    localStorage.setItem('firstUpload', '1');
  }

  saveTarget(result);

  return result;
};

export const progressToNextTarget = (points: number) => {
  const target = points + Math.floor(points * 0.25);

  if (target === points) {
    saveTarget(target + 1);
    return;
  }

  saveTarget(target);
};

const saveTarget = (value: number) => {
  localStorage.setItem(STORAGE_KEY, value.toString());

  const token = Cookies.get('token');

  if (!token) {
    return;
  }

  fetch('https://korekuta.ru/api/games/submit-record', {
    method: 'POST',
    body: JSON.stringify({ token, result: value, game: 'project231231' })
  })
    .then(() => {
      Logger.getInstance().info('Result uploaded to servers!');
    })
    .catch((e) => {
      Logger.getInstance().error('Error occured while saving results to server', e);
    });
};
