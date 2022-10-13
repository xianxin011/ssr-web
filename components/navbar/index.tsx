import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Themes, Environment } from "@/config/constant";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/useAgent";
import logoLight from "@/public/vercel.svg";
import { LOCALDOMAIN } from "@/define/websitePath";
import { signOut } from "next-auth/react";
import CN from "classnames";
import styles from "./styles.module.scss";

export interface INavBarItem {
  label: string;
  link: string;
  isHome?: boolean;
}
export interface INavBarProps {
  items?: INavBarItem[];
}

export const NavBar: FC<INavBarProps> = (props) => {
  const { items } = props||{};
  const router = useRouter();
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);

  const [currentPath, setCurrentPath] = useState<string>("");

  const handleClickNav = (setPath: string) => {
    setCurrentPath(setPath);
  };
  useEffect(() => {
    if (router.pathname) {
      setCurrentPath(router.pathname);
    }
  }, [router.pathname]);

  return (
    <div className={styles.navBar}>
      <a href="http://localhost:3000/">
        <Image src={logoLight} alt="Bonustate" width={70} height={20} />
      </a>
      <ul className={styles.navItems}>
        {(items || []).map((item: INavBarItem, index: number) => {
          return (
            <li
              key={index}
              className={CN(styles.navItem, {
                [styles.navActiveItem]: currentPath === item.link,
              })}
              onClick={() => handleClickNav(item.link)}
            >
              <a href={`${LOCALDOMAIN}${item.link}`}>{item.label}</a>
            </li>
          );
        })}
      </ul>
      <div className={styles.themeArea}>
        {userAgent === Environment.pc && (
          <span className={styles.text}>当前是pc端样式</span>
        )}
        {userAgent === Environment.ipad && (
          <span className={styles.text}>当前是Ipad端样式</span>
        )}
        {userAgent === Environment.mobile && (
          <span className={styles.text}>当前是移动端样式</span>
        )}
        <div onClick={async () => signOut()}>退出</div>
        <div
          className={styles.themeIcon}
          onClick={(): void => {
            if (localStorage.getItem("theme") === Themes.light) {
              setTheme(Themes.dark);
            } else {
              setTheme(Themes.light);
            }
          }}
        ></div>
      </div>
    </div>
  );
};
