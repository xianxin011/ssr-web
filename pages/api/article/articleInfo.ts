import type { NextApiRequest, NextApiResponse } from "next";
import { initArticleInfoDataServer } from "@/services/article";

import { CMSDOMAIN } from "@/define/websitePath";

import { IArticleProps } from "../../article/[articleId]";

const getArticleInfoData = (
  req: NextApiRequest,
  res: NextApiResponse<IArticleProps>
) => {
  const { articleId } = req.query;
  initArticleInfoDataServer(`${CMSDOMAIN}/api/article-infos/${articleId}`).then(
    (result: any) => {
      const data = result || {};

      res.status(200).json(data);
    }
  );
};

export default getArticleInfoData;
