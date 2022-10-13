// 项目入口
import "../styles/base.css";
import type { AppProps, AppContext } from "next/app";
import type { NextPageContext } from "next";
import { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";

import { Layout, ILayoutProps } from "@/components/layout";

import { LOCALDOMAIN } from "@/define/websitePath";
import { getIsMobile } from "@/utils";
import { axiosInstance } from "@/services/request";
import { getLayoutInitDataClient, getSessionClient } from "@/services/layout";

import { ThemeContextProvider } from "@/stores/theme";
import { UserAgentProvider } from "@/stores/useAgent";
import { UserTokenProvider } from "@/stores/useToken";
import "../styles/global.scss";

interface IComponent extends NextPageContext {
  Component: {
    auth: boolean;
  };
}

interface ISession {
  accessToken: string;
}

// 权限
function Auth(props: { children: JSX.Element }) {
  const { children } = props;
  const { data: session } = useSession({ required: true });
  const user = session?.user;

  // 已经登陆时，直接进入访问页面
  if (user) {
    return children;
  }
  // 当没有登陆时，展示加载内容（然后会自动定向到登陆页面）
  return <div>...loading</div>;
}

function AppHome(
  data: AppProps &
    ILayoutProps & {
      isMobile: boolean;
      session: Session | null;
    } & IComponent
) {
  const { Component, pageProps, navbarData, footerData, isMobile, session } =
    data;

  return (
    <Fragment>
      <Head>
        <title>bonustate-webstate</title>
        <meta
          name="description"
          content={`A Demo for 《深入浅出SSR官网开发指南》(${
            isMobile ? "移动端" : "pc端"
          })`}
        />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 需要保护需要加Auth */}
      <SessionProvider session={session} refetchInterval={10}>
        {Component.auth ? (
          <Auth>
            <UserTokenProvider>
              <ThemeContextProvider>
                <UserAgentProvider>
                  <Layout navbarData={navbarData} footerData={footerData}>
                    <Component {...pageProps} />
                  </Layout>
                </UserAgentProvider>
              </ThemeContextProvider>
            </UserTokenProvider>
          </Auth>
        ) : (
          <ThemeContextProvider>
            <UserAgentProvider>
              <Layout navbarData={navbarData} footerData={footerData}>
                <Component {...pageProps} />
              </Layout>
            </UserAgentProvider>
          </ThemeContextProvider>
        )}
      </SessionProvider>
    </Fragment>
  );
}

AppHome.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);

  const data =
    (await getLayoutInitDataClient(`${LOCALDOMAIN}/api/basic/layout`)) || {};
  const session =
    (await getSessionClient(`${LOCALDOMAIN}/api/auth/session`)) || {};
  console.log(process.env);

  return {
    ...pageProps,
    // ...data,
    footerData: {
      title: "Demo",
      linkList: [
        {
          title: "技术栈",
          list: [
            {
              label: "react",
            },
            {
              label: "typescript",
            },
            {
              label: "ssr",
            },
            {
              label: "nodejs",
            },
          ],
        },
        {
          title: "了解更多",
          list: [
            {
              label: "掘金",
              link: "https://juejin.cn/user/2714061017452557",
            },
            {
              label: "知乎",
              link: "https://www.zhihu.com/people/zmAboutFront",
            },
            {
              label: "csdn",
            },
          ],
        },
        {
          title: "联系我",
          list: [{ label: "微信" }, { label: "QQ" }],
        },
      ],
      qrCode: {
        image: "",
        text: "",
      },
      copyRight: "Copyright © 2022 xxx. 保留所有权利",
      siteNumber: "粤ICP备XXXXXXXX号-X",
      publicNumber: "粤公网安备 xxxxxxxxxxxxxx号",
    },
    navbarData: {
      items: [
        {
          label: "发现",
          link: "/",
        },
        {
          label: "优惠",
          link: "/discount",
        },
        {
          label: "信用卡",
          link: "/credit",
        },
        {
          label: "贷款",
          link: "/loan",
        },
      ],
    },
    isMobile: getIsMobile(context),
    session,
  };
};

export default AppHome;
