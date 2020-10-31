import { InputLabel } from "@material-ui/core";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./PetCard.module.css";

export interface IParam {
  id: string;
}

export const PetCard = () => {
  const {
    data: {
      petColorTypes,
      petEarsTypes,
      petHairTypes,
      petSizes,
      petTypeList,
      shelterList,
      tailList,
      breedList,
      sexTypes,
    },
    dataset,
  } = useContext(AuthContext);

  const { id } = useParams<IParam>();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        КАРТОЧКА УЧЕТА ЖИВОТНОГО №{dataset[parseFloat(id)]?.cardId}
      </div>
      <div className={styles.content}>
        <InputLabel id="demo-simple-select-outlined-label" required>
          Приют для животных по адресу: {}
        </InputLabel>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
