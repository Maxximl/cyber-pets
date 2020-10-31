import React from "react";
import { Nav } from "../Nav";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Nav />
    </div>
  );
};
