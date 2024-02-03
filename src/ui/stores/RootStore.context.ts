import React from 'react';

import { RootStore } from './RootStore';

export const RootStoreContext = React.createContext<null | RootStore>(null);

export const useStore = () => {
  const store = React.useContext(RootStoreContext);

  if (store === null) {
    throw new Error('Store cannot be null!');
  }

  return store;
};
