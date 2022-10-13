import React, { forwardRef, useState, useImperativeHandle } from "react";
import styles from "./styles.module.scss";
import cName from "classnames";

export interface IPopupRef {
  open: () => void;
}

interface IProps {
  children: JSX.Element;
}

export const Popup = forwardRef<IPopupRef, IProps>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (): void => {
      setVisible(true);
    },
  }));

  const renderDom = visible ? (
    <div
      className={cName({
        [styles.popup]: true,
      })}
    >
      <div className={styles.mask} />
      <div className={styles.popupContent}>
        <div
          className={styles.closeBtn}
          onClick={(): void => {
            setVisible(false);
          }}
        />
        {children}
      </div>
    </div>
  ) : (
    <></>
  );

  return renderDom;
});
