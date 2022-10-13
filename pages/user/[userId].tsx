import React, { FC, useContext } from "react";
import { getSession } from "next-auth/react";
import { UserTokenContext } from "@/stores/useToken";

export interface IUserProps {
  session: any;
}
const User: FC<IUserProps> & { auth: boolean } = (props: IUserProps) => {
  const { session } = props || {};
  const { token } = useContext(UserTokenContext);
  console.log(token);
  return (
    <div>
      <h1>欢迎您{session ? session.user : ""}</h1>
    </div>
  );
};

export default User;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // let users;
  // try {
  //   //   users = await GET(
  //   //     "/api/v1/user",
  //   //     {},
  //   //     { headers: { authorization: `Bearer ${session.user.accessToken}` } }
  //   //   );
  //   // console.log(users);
  // } catch (error) {
  //   console.log(error);
  // }
  return {
    props: {
      session,
    },
  };
}

User.auth = true;
