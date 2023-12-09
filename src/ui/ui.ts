export const ui = document.querySelector('#ui');

export class BaseUi {
  constructor(private _ui: Element) {}

  public hide() {
    this._ui.classList.add('hide');
  }

  public show() {
    this._ui.classList.remove('hide');
  }
}
