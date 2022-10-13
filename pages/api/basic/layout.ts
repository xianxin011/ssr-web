import type { NextApiRequest, NextApiResponse } from "next";
import { ILayoutProps } from "@/components/layout";
import { CMSDOMAIN } from "@/define/websitePath";
import { isEmpty } from "lodash";
import nc from "next-connect";
import Cors from "cors";
import { getLayoutInitDataServer } from "@/services/layout/index";

const getLayoutData = nc()
  .use(Cors())
  .get((req: NextApiRequest, res: NextApiResponse<ILayoutProps>) => {
    getLayoutInitDataServer(`${CMSDOMAIN}/api/layouts`).then((result: any) => {
      const {
        copy_right,
        link_lists,
        public_number,
        qr_code,
        qr_code_image,
        site_number,
        title,
      } = result || {};

      res.status(200).json({
        navbarData: {},
        footerData: {
          title,
          linkList: link_lists?.data?.map((item: any) => {
            return {
              title: item.title,
              list: item?.links?.data?.map((_item: any) => {
                return {
                  label: _item.label,
                  link: isEmpty(_item.link) ? "" : _item.link,
                };
              }),
            };
          }),
          qrCode: {
            image: `${CMSDOMAIN}${qr_code_image.data.url}`,
            text: qr_code,
          },
          copyRight: copy_right,
          siteNumber: site_number,
          publicNumber: public_number,
        },
      });
    });
  });

export default getLayoutData;
