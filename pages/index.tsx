import type { NextPage, NextPageContext } from "next";
import type { HomeData } from "@/types/home";
import type {
  IArticleIntro,
  IArticleIntroProps,
} from "./api/article/articleIntro";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/stores/theme";
import cName from "classnames";
import { Pagination } from "@douyinfe/semi-ui";

import { initHomeDataClient } from "@/services/home";
import { initArticleIntroDataClient } from "@/services/article";

import { LOCALDOMAIN } from "@/define/websitePath";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
  description: string;
  articles: {
    list: {
      label: string;
      info: string;
      link: string;
    }[];
    total: number;
  };
}

const Home: NextPage<IProps> = ({ title, description, articles }) => {
  const { list, total } = articles || {};
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  const [content, setContent] = useState(list);

  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);

  return (
    <div className={styles.container}>
      <main
        className={cName([styles.main, styles.withAnimation])}
        ref={mainRef}
      >
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        <div className={styles.grid}>
          {content?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={(): void => {
                  window.open(
                    item.link,
                    "blank",
                    "noopener=yes,noreferrer=yes"
                  );
                }}
              >
                <h2>{item.label} &rarr;</h2>
                <p>{item.info}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.paginationArea}>
          <Pagination
            showTotal
            total={total}
            pageSize={1}
            onPageChange={(pageNo) => {
              initArticleIntroDataClient(
                `${LOCALDOMAIN}/api/article/articleIntro`,
                {
                  pageNo,
                  pageSize: 6,
                }
              ).then((result: any) => {
                setContent(result.list);
              });
            }}
          />
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async () => {
  const homeData = (await initHomeDataClient(
    `${LOCALDOMAIN}/api/home/home`
  )) as HomeData;

  const articleData = (await initArticleIntroDataClient(
    `${LOCALDOMAIN}/api/article/articleIntro`,
    {
      pageNo: 1,
      pageSize: 6,
    }
  )) as IArticleIntroProps;

  return {
    // title: homeData.title,
    // description: homeData.description,
    // articles: {
    //   list: articleData.list.map((item: IArticleIntro) => {
    //     return {
    //       label: item.label,
    //       info: item.info,
    //       link: `${LOCALDOMAIN}/article/${item.articleId}`,
    //     };
    //   }),
    //   total: articleData.total,
    // },
    title: "Hello World",
    description: "Welcome to Bonustate",
    articles: {
      list: [
        {
          label: "文章1",
          info: "A test for article1",
          link: "http://localhost:3000/article/1",
        },
        {
          label: "文章2",
          info: "A test for article2",
          link: "http://localhost:3000/article/2",
        },
        {
          label: "文章3",
          info: "A test for article3",
          link: "http://localhost:3000/article/3",
        },
        {
          label: "文章4",
          info: "A test for article4",
          link: "http://localhost:3000/article/4",
        },
        {
          label: "文章5",
          info: "A test for article5",
          link: "http://localhost:3000/article/5",
        },
        {
          label: "文章6",
          info: "A test for article6",
          link: "http://localhost:3000/article/6",
        },
      ],
      total: articleData.total,
    },
  };
};
export default Home;
