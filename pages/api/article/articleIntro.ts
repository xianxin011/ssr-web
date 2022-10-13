import type { NextApiRequest, NextApiResponse } from "next";
import { CMSDOMAIN } from "@/define/websitePath";
import nc from "next-connect";
import Cors from "cors";
import { initArticleIntroDataServer } from "@/services/article";

export interface IArticleIntro {
  label: string;
  info: string;
  articleId: number;
}

export interface IArticleIntroProps {
  list: Array<{ label: string; info: string; articleId: number }>;
  total: number;
}

const getArticleIntroData = nc()
  .use(Cors())
  .get(
    async (req: NextApiRequest, res: NextApiResponse<IArticleIntroProps>) => {
      const { pageNo, pageSize } = req.body;
      initArticleIntroDataServer(`${CMSDOMAIN}/api/article-introductions`, {
        params: {
          pageNo,
          pageSize,
        },
      }).then((result: any) => {
        const { data, meta } = result || {};

        res.status(200).json({
          list: Object.values(data),
          total: meta.pagination.total,
        });
      });
    }
  );

export default getArticleIntroData;
