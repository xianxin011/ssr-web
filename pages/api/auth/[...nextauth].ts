import NextAuth, { NextAuthOptions, Awaitable } from "next-auth";
import { request } from "@/services/request";
import type { NextApiRequest, NextApiResponse } from "next";
import LK from "@/define/localstorageKey";
import { isEmpty } from "lodash";
import { setLocalStorageValue } from "@/utils/tools";
import CredentialsProvider from "next-auth/providers/credentials";

const saveUserInfo = (params: any): void => {
  const { token } = params || {};
  if (token) {
    setLocalStorageValue(LK.USER_TOKEN, token);
  }
  if (!isEmpty(params)) {
    setLocalStorageValue(LK.USER_INFO, params);
  }
};

const nextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "credentials",
        // 若是不自定义登陆界面，则默认以此内容渲染相应的表单
        credentials: {
          // username: {
          //   label: "账户",
          //   type: "text",
          //   placeholder: "请输入登陆账户",
          // },
          // password: {
          //   label: "密码",
          //   type: "password",
          //   placeholder: "请输入登陆密码",
          // },
        },
        // 登陆验证逻辑，返回用户信息表示登陆成功，返回 null 或 false 表示登陆失败
        authorize: async (credentials: any, req: any): Promise<any> => {
          try {
            const user = {
              username: "mor_2314",
              password: "83r5^_",
            };
            const result: any = await request(
              `${process.env.APP_TEST_URL}/auth/login`,
              {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const { token } = result;
            return {
              ...user,
              accessToken: token,
              refreshToken: false,
              // accessTokenExpires:
            };
          } catch (error) {
            return null;
          }
        },
      }),
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 14 * 24 * 60 * 60,
    },
    jwt: {
      maxAge: 2 * 60 * 60,
    },
    pages: {
      signIn: "/user/login", // 自定义登陆界面
    },
    /**
     * 回调
     * jwt：每当创建 JSON WEB 令牌（即登录时）或更新（即每当在客户端访问会话时）时都会调用此回调，返回的值将被加密并存储在cookie中。
     * session：每当检查会话时（调用getSession()、useSession()、/api/auth/session等方法时），都会调用此会话回调。想使通过jwt()回调添加到令牌中的某些内容可用，则必须在此处显式转发以使其对客户端可用。
     * 回调的优先级：jwt > session
     */
    callbacks: {
      async jwt({ token, user, account }: any) {
        // 在登陆时判断是否是自定义登录的方式，并将用户信息保存到next-auth生成的token中，（因为next-auth最终提供的用户信息很少，不能满足需要，因此需要我们自己通过传递设置
        if (account && account.type === "credentials" && user) {
          token.user = user;
          token.accessToken = user.accessToken;
        }
        return token;
      },
      //   每次调用 getSession() 、useSession() 的时候 都会触发并将 token 存入 user 中
      async session({ session, token }: any) {
        // 自定义会话中的user（因为默认的会话中的user信息不能满足我们的需求）
        session.user = token.user.username;
        session.accessToken = token.accessToken;
        return session;
      },
    },
  };
};

const NextAuthCombine = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default NextAuthCombine;
