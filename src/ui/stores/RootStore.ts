import Cookies from 'js-cookie';
import { Model, model, modelAction, modelFlow, prop, registerRootStore } from 'mobx-keystone';

import { getLastSavedTarget } from '../../progression';

export type ActiveMenu = 'preload' | 'mainmenu';

@model('Root')
export class RootStore extends Model({
  activeMenu: prop<ActiveMenu>('preload').withSetter(),

  loadState: prop<'unloaded' | 'loading' | 'loaded'>('unloaded').withSetter(),

  authStatus: prop<boolean>(false),

  targetValue: prop<number>(getLastSavedTarget())
}) {
  @modelAction
  openMainMenu() {
    this.setActiveMenu('mainmenu');
  }

  @modelFlow
  *checkAuthorization() {
    this.authStatus = !!Cookies.get('token');
  }
}

export const rootStore = new RootStore({});

registerRootStore(rootStore);
