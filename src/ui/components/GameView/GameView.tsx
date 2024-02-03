import React from 'react';

import { Game } from '../../../game';

import { useStore } from '../../stores/RootStore.context';

import classes from './GameView.modules.scss';

interface Props {
  onCanvasReady: () => void;
}

export const GameView: React.FC<Props> = ({ onCanvasReady }) => {
  const canvasRef = React.useRef(null);
  const store = useStore();

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // store.setGame(new Game());
    onCanvasReady();
  }, []);

  return <canvas ref={canvasRef} id="game" className={classes.canvas}></canvas>;
};
