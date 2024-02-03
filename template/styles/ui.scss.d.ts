declare namespace UiScssNamespace {
  export interface IUiScss {
    authBtn: string;
    authStatus: string;
    backBtn: string;
    background: string;
    bar: string;
    bg: string;
    bottlesContainer: string;
    bottom: string;
    button: string;
    buttonContainer: string;
    center: string;
    close: string;
    container: string;
    continue: string;
    credits: string;
    dash: string;
    desc: string;
    description: string;
    disabled: string;
    entry: string;
    footer: string;
    fullscreenBtn: string;
    gameOver: string;
    gameWin: string;
    gameplay: string;
    gradient: string;
    guide: string;
    health: string;
    hide: string;
    horny: string;
    hornyWarning: string;
    hud: string;
    key: string;
    leaderboard: string;
    left: string;
    link: string;
    loading: string;
    loadingBtn: string;
    mainMenu: string;
    memeSign: string;
    no: string;
    pixelBorder: string;
    play: string;
    playBtn: string;
    points: string;
    popup: string;
    pressed: string;
    pulsate: string;
    ready: string;
    restart: string;
    return: string;
    right: string;
    showHorny: string;
    speed: string;
    subtitle: string;
    target: string;
    text: string;
    title: string;
    ui: string;
    value: string;
    version: string;
    whatsnew: string;
    wrapper: string;
    yes: string;
  }
}

declare const UiScssModule: UiScssNamespace.IUiScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UiScssNamespace.IUiScss;
};

export = UiScssModule;
