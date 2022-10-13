// import type { NextPage } from "next";
// import { LOCALDOMAIN } from "@/define/websitePath";
// import { initArticleInfoDataClient } from "@/services/article";
// import styles from "./styles.module.scss";

// const showdown = require("showdown");
export interface IArticleProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}

// const Article: NextPage<IArticleProps> = ({
//   title,
//   author,
//   description,
//   createTime,
//   content,
// }) => {
//   const converter = new showdown.Converter();
//   return (
//     <div className={styles.article}>
//       <h1 className={styles.title}>{title}</h1>
//       <div className={styles.info}>
//         作者：{author} | 创建时间: {createTime}
//       </div>
//       <div className={styles.description}>{description}</div>
//       <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
//     </div>
//   );
// };

// Article.getInitialProps = async (context) => {
//   const { articleId } = context.query || {};
//   const data = (await initArticleInfoDataClient(
//     `${LOCALDOMAIN}/api/article/articleInfo`,
//     {
//       params: {
//         articleId,
//       },
//     }
//   )) as IArticleProps;
//   return data;
// };

// export default Article;

import type { NextPage } from "next";

interface IProps {
  articleId: number;
}

const Article: NextPage<IProps> = ({ articleId }) => {
  return (
    <div>
      <h1>文章{articleId}</h1>
    </div>
  );
};

Article.getInitialProps = (context) => {
  const { articleId } = context.query;
  return {
    articleId: Number(articleId),
  };
};

export default Article;
