/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaPlay } from 'react-icons/fa';

import { useStore } from '../../../stores/RootStore.context';
import { Button } from '../../Button';

import classes from './MainMenu.modules.scss';

export const MainMenu = () => {
  const store = useStore();

  const authStatusText = store.authStatus ? <span className={classes.yes}>Да</span> : <span className={classes.no}>Нет</span>;

  return (
    <div className={classes.root}>
      <div className={classes.overlay}>
        <h1 className={classes.header}>
          <a href="https://www.twitch.tv/owlielowi">OwlieLowi</a>'s Nightmare
        </h1>

        <div className={classes.buttons}>
          <Button className={classes.play}>
            <FaPlay className={classes.icon} />
            Начать играть
          </Button>
        </div>

        <div className={classes.footer}>
          Created by <a href="https://korekuta.ru">KingoSawada</a>
        </div>

        <div className={classes.authStatus}>Статус авторизации: {authStatusText}</div>
        <div className={classes.version}>v0.5-everlasting-hope</div>
      </div>
    </div>
  );
};
