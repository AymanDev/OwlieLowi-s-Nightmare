import React from 'react';

import { Game } from '../../../game';
import { rootStore } from '../../stores/RootStore';
import { RootStoreContext } from '../../stores/RootStore.context';
import { GameUI } from '../GameUI';
import { GameView } from '../GameView';

import classes from './Root.module.scss';

interface GameContextValue {
  game: Game;
}

export const GameContext = React.createContext<GameContextValue | null>(null);

export const Root: React.FC = () => {
  const [game, setGame] = React.useState<Game | null>(null);

  const handleCanvaseReady = () => {
    setGame(new Game());
  };

  const contextValue = React.useMemo<GameContextValue>(
    () => ({
      game
    }),
    [game]
  );

  return (
    <div className={classes.root}>
      <GameContext.Provider value={contextValue}>
        <RootStoreContext.Provider value={rootStore}>
          <GameUI>
            <GameView onCanvasReady={handleCanvaseReady} />
          </GameUI>
        </RootStoreContext.Provider>
      </GameContext.Provider>
    </div>
  );
};
