declare namespace PreloadMenuModulesScssNamespace {
  export interface IPreloadMenuModulesScss {
    button: string;
    disabled: string;
    overlay: string;
    root: string;
  }
}

declare const PreloadMenuModulesScssModule: PreloadMenuModulesScssNamespace.IPreloadMenuModulesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PreloadMenuModulesScssNamespace.IPreloadMenuModulesScss;
};

export = PreloadMenuModulesScssModule;
