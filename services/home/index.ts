import { requestGet } from "../request";

// 请求真实地址
export const initHomeDataServer = (params: string) => {
  return requestGet(params);
};

// 本地请求地址
export const initHomeDataClient = (params: string) => {
  return requestGet(params);
};
