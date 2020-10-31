import React from "react";
import styles from "./Pets.module.css";
import Table from "../Table";

export const Pets = () => {
  return (
    <div className={styles.container}>
      Петы
      <Table />{" "}
    </div>
  );
};
