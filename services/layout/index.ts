import { requestGet } from "../request";

// 请求真实地址
export const getLayoutInitDataServer = (params: string) => {
  return requestGet(params);
};

// 本地请求地址
export const getLayoutInitDataClient = (params: string) => {
  return requestGet(params);
};

// 本地请求地址
export const getSessionClient = (params: string) => {
  return requestGet(params);
};
