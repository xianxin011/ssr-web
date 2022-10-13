import axios from "axios";
import qs from "qs";
import type { AxiosError, AxiosResponse } from "axios";
import type { RequestConfig, ResposeData } from "@/types/request";
import defaultConfigs from "@/config/constant";
import { LOCALDOMAIN } from "@/define/websitePath";

let baseUrl = "";
const env = process.env.NODE_ENV;

if (env === "development") {
  baseUrl = LOCALDOMAIN;
} else {
  baseUrl = "";
}

// 设置默认请求
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: defaultConfigs.timeOut,
  withCredentials: true,
});

/**
 * http request 拦截器
 */

axiosInstance.interceptors.request.use(
  (config: RequestConfig) => {
    const defaultOptions = {
      credentials: "include",
    };
    const newOptions = { ...defaultOptions };

    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

/**
 * http response 拦截器
 */

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response?.headers["set-cookie"]) {
    //   const headersObj = axiosInstance.defaults.headers;
    //   if (headersObj.setCookie) {
    //     (headersObj as any).setCookie(response?.headers["set-cookie"]);
    //   }
    // }
    return response;
  },
  (err: AxiosError) => err
);

export function requestGet(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, params)
      .then((res: ResposeData) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

export function requestPost(url: string, data: any, options?: any) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data, options)
      .then((res: ResposeData) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

// restful delete 请求
export function requestDelete(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, data)
      .then((res: ResposeData) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

// restful put 请求
export function requestPut(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, data)
      .then((res: ResposeData) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

// 自定义请求
export function request(url: string, params: any) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      timeout: defaultConfigs.timeOut,
      withCredentials: true,
      ...params,
    })
      .then((res) => res.json())
      .then((res: any) => resolve(res))
      .catch((error: any) => reject(error));
  });
}
