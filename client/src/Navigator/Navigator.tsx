import React from "react";
import { FaCat, FaDog, FaEye } from "react-icons/fa";
import styles from "./Navigator.module.css";
import { Link } from "react-router-dom";

export const Navigator = () => {
  return (
    <div className={styles.navigator}>
      <div className={styles.category}>
        <Link to="/cameras/all">
          <FaEye />
        </Link>
      </div>
      <div className={styles.category}>
        <Link to="/cameras/cats">
          <FaCat />
        </Link>
      </div>
      <div className={styles.category}>
        <Link to="/cameras/dogs">
          <FaDog />
        </Link>
      </div>
    </div>
  );
};
