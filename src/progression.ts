const STORAGE_KEY = 'target';

const START_TARGET = 3;

export const getLastSavedTarget = () => {
  const item = localStorage.getItem(STORAGE_KEY);

  if (!item) {
    saveTarget(START_TARGET);

    return START_TARGET;
  }

  return Number(item);
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
};
