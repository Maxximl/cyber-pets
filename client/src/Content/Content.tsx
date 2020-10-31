import React from "react";
import { Cameras } from "../Cameras";
import { Navigator } from "../Navigator";
import { Promo } from "../Promo";
import styles from "./Content.module.css";

export const Content = () => {
  return (
    <div className={styles.content}>
      <Navigator />
      {/* <Promo /> */}
      {/* <Cameras /> */}
      {/* <AddDataPage /> */}
      {/* <AuthPage /> */}
    </div>
  );
};
