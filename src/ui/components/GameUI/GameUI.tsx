import { observer } from 'mobx-react-lite';
import React from 'react';

import { ActiveMenu } from '../../stores/RootStore';
import { useStore } from '../../stores/RootStore.context';
import { MainMenu } from '../menus/MainMenu';
import { PreloadMenu } from '../menus/PreloadMenu';

import classes from './GameUI.modules.scss';

interface Props {
  children?: React.ReactNode;
}

const MENU_MAP: Record<ActiveMenu, React.FC> = {
  preload: PreloadMenu,
  mainmenu: MainMenu
};

export const GameUI: React.FC<Props> = observer(({ children }) => {
  const store = useStore();

  const MenuComponent = React.useMemo(() => MENU_MAP[store.activeMenu], [store.activeMenu]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.ui}>
          <MenuComponent />
        </div>
        <div className={classes.game}>{children}</div>
      </div>
    </div>
  );
});
