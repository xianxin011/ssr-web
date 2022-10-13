import { requestGet } from "../request";

export interface IArticlePage {
  pageNo: any;
  pageSize: any;
  session?: any;
}

export interface IParams {
  params: IArticlePage;
}

export interface IarticleInfo {
  articleId?: string | string[];
}

export interface IArticleInfoParams {
  params: IarticleInfo;
}

// 请求真实地址
export const initArticleIntroDataServer = (url: string, params: IParams) => {
  return requestGet(url, params);
};

// 本地请求地址
export const initArticleIntroDataClient = (
  url: string,
  params?: IArticlePage
) => {
  return requestGet(url, params);
};

// 文章内容请求真实地址
export const initArticleInfoDataServer = (url: string) => {
  return requestGet(url);
};

// 文章内容本地请求地址
export const initArticleInfoDataClient = (
  url: string,
  params?: IArticleInfoParams
) => {
  return requestGet(url, params);
};
