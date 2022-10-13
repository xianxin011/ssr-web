import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { isEmpty } from "lodash";
import { useEffect } from "react";
export interface ILoginProps {
  crsfToken: string;
}
const handleCallbackUrl = (
  callbackUrl: string | string[] | undefined
): string => {
  let handleCallback;
  if (!callbackUrl) return "";
  if (callbackUrl && Array.isArray(callbackUrl)) {
    handleCallback = callbackUrl[0];
  } else {
    handleCallback = callbackUrl;
  }
  return handleCallback;
};

const Login: NextPage<ILoginProps> = (props: ILoginProps) => {
  const { crsfToken } = props;
  const session = useSession();
  const router = useRouter();

  const onSubmit = async () => {
    let callbackUrl;

    return signIn("credentials", {
      crsfToken,
      callbackUrl: handleCallbackUrl(router.query.callbackUrl),
    });
  };

  useEffect(() => {
    if (session.data && !isEmpty(session.data)) {
      window.open(handleCallbackUrl(router.query.callbackUrl), "_self");
    }
  }, [session, router.query.callbackUrl]);
  return <button onClick={onSubmit}>登录</button>;
};

export default Login;

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
