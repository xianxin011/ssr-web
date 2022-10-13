const defaultConfigs = {
  timeOut: 1000 * 60 * 5, /// 请求超时时间
};

export default defaultConfigs;

export enum Themes {
  light = "light",
  dark = "dark",
}

export enum Environment {
  pc = "pc",
  ipad = "ipad",
  mobile = "mobile",
  none = "none",
}

export enum Language {
  ch = "ch",
  en = "en",
}

export enum TokenKey {
  bonustate_token = "_bonustate_token",
}
