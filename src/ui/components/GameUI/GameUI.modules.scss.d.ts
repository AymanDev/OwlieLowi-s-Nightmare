declare namespace GameUiModulesScssNamespace {
  export interface IGameUiModulesScss {
    container: string;
    game: string;
    root: string;
    ui: string;
  }
}

declare const GameUiModulesScssModule: GameUiModulesScssNamespace.IGameUiModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GameUiModulesScssNamespace.IGameUiModulesScss;
};

export = GameUiModulesScssModule;
