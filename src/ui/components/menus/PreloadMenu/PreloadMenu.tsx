import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useStore } from '../../../stores/RootStore.context';
import { Button } from '../../Button';
import { GameContext } from '../../Root';

import classes from './PreloadMenu.modules.scss';

export const PreloadMenu = observer(() => {
  const { game } = React.useContext(GameContext);

  const store = useStore();

  const handlePlay = async () => {
    store.setLoadState('loading');
    await game.start();
    store.setLoadState('loaded');
    store.openMainMenu();
  };

  const loadStateText = store.loadState === 'unloaded' ? 'Загрузить игру' : 'Игра загружается';

  return (
    <div className={classes.root}>
      <div className={cn(classes.overlay, { [classes.disabled]: store.loadState !== 'unloaded' })} onClick={handlePlay}>
        <Button className={classes.button}>{loadStateText}</Button>
      </div>
    </div>
  );
});
