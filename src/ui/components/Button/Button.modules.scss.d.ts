declare namespace ButtonModulesScssNamespace {
  export interface IButtonModulesScss {
    root: string;
  }
}

declare const ButtonModulesScssModule: ButtonModulesScssNamespace.IButtonModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonModulesScssNamespace.IButtonModulesScss;
};

export = ButtonModulesScssModule;
