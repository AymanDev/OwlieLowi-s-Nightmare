declare namespace MainMenuModulesScssNamespace {
  export interface IMainMenuModulesScss {
    authStatus: string;
    buttons: string;
    footer: string;
    header: string;
    icon: string;
    no: string;
    overlay: string;
    play: string;
    root: string;
    version: string;
    yes: string;
  }
}

declare const MainMenuModulesScssModule: MainMenuModulesScssNamespace.IMainMenuModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainMenuModulesScssNamespace.IMainMenuModulesScss;
};

export = MainMenuModulesScssModule;
