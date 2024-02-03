declare namespace GameViewModulesScssNamespace {
  export interface IGameViewModulesScss {
    canvas: string;
  }
}

declare const GameViewModulesScssModule: GameViewModulesScssNamespace.IGameViewModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GameViewModulesScssNamespace.IGameViewModulesScss;
};

export = GameViewModulesScssModule;
