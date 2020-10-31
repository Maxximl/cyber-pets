import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import styles from "./Promo.module.css";
import dogPhoto from "./img/dogs.jpg";
import catPhoto from "./img/cats.jpg";
import dogs2 from "./img/dogs2.jpeg";
import EnhancedTable from "../Table/Table";

export const Promo = () => {
  const slider = (
    <AwesomeSlider style={{ height: "100%" }}>
      <div data-src={dogPhoto} />
      <div data-src={catPhoto} />
      <div data-src={dogs2} />
    </AwesomeSlider>
  );

  return (
    <div className={styles.promo}>
      <div className={styles.slider}>{slider}</div>
      <div className={styles.table}>
        <EnhancedTable />
      </div>
    </div>
  );
};
