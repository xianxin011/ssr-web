import React, { useState, useEffect, createContext } from "react";
import { getSession } from "next-auth/react";
import { TokenKey } from "@/config/constant";

interface IUserTokenContextProps {
  token: TokenKey;
  setUserToken: (t: string) => void;
}

interface IProps {
  children: JSX.Element;
}

export const UserTokenContext = createContext<IUserTokenContextProps>(
  {} as IUserTokenContextProps
);

export const UserTokenProvider = ({ children }: IProps): JSX.Element => {
  const [userToken, setUserToken] = useState<any>("");
  const initalToken = async (): Promise<string> => {
    const session: any = (await getSession()) || {};
    setUserToken(session.accessToken);
    return session.accessToken;
  };
  useEffect(() => {
    initalToken();
  }, [typeof document !== "undefined"]);

  return (
    <UserTokenContext.Provider value={{ token: userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};
