import type { NextApiRequest, NextApiResponse } from "next";
import { CMSDOMAIN } from "@/define/websitePath";
import nc from "next-connect";
import Cors from "cors";
import { initHomeDataServer } from "@/services/home";

export interface IHomeProps {
  title: string;
  description: string;
}

const getHomeData = nc()
  .use(Cors())
  .get((req: NextApiRequest, res: NextApiResponse<IHomeProps>) => {
    initHomeDataServer(`${CMSDOMAIN}/api/homes`).then((result: any) => {
      const { title, description } = result || {};

      res.status(200).json({
        title,
        description,
      });
    });
  });

export default getHomeData;
