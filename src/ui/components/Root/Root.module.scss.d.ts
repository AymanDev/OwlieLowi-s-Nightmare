declare namespace RootModuleScssNamespace {
  export interface IRootModuleScss {
    root: string;
  }
}

declare const RootModuleScssModule: RootModuleScssNamespace.IRootModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RootModuleScssNamespace.IRootModuleScss;
};

export = RootModuleScssModule;
