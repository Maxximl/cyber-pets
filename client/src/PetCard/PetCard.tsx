import { Button, Checkbox, InputLabel } from "@material-ui/core";
import { spawn } from "child_process";
import { parse } from "path";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import styles from "./PetCard.module.css";
import image from "./img/2.jpg";

export interface IParam {
  id: string;
}

export interface IPet {
  act: string;
  address: string;
  animalCareWorkerFio: string;
  aviary: number;
  birhYear: string;
  breed: string;
  breedTypeId: number;
  captureAct: string;
  cardId: string;
  catchingAddress: string;
  color: string;
  contract: string;
  departureDate: string;
  departureReason: string;
  directorFio: string;
  district: string;
  ears: string;
  hair: string;
  id: number;
  identificationMark: number;
  nickName: string;
  operatingOrganizationId: string;
  petColorTypeId: number;
  petEarsTypeId: number;
  petHairTypeId: number;
  petId: number;
  petTailTypeId: number;
  petTypeId: number;
  petsSizeId: number;
  phone: string;
  receiptDate: string;
  sex: string;
  sexTypeId: number;
  shelterId: number;
  shortName: string;
  size: string;
  socialized: string;
  specialSigns: string;
  sterilizationDate: string;
  subordination: string;
  tail: string;
  veterinarian: string;
  weight: number;
  workOrder: string;
  workOrderDate: string;
}

type IPetPartial = Partial<IPet>;

export const PetCard = () => {
  //   const {
  //     data: {
  //       petColorTypes,
  //       petEarsTypes,
  //       petHairTypes,
  //       petSizes,
  //       petTypeList,
  //       shelterList,
  //       tailList,
  //       breedList,
  //       sexTypes,
  //     },
  //     dataset,
  //   } = useContext(AuthContext);

  const { id } = useParams<IParam>();
  const { request } = useHttp();

  const getData = async () => {
    try {
      const pet = await request(`/data/pet/${id}`);
      if (pet.result && pet.result[0]) {
        setPet(pet.result[0]);
      }
      console.log(pet.result);
    } catch (error) {
      console.error(error);
    }
  };

  const [pet, setPet] = useState<IPetPartial>({});
  useEffect(() => {
    getData();
  }, []);

  const rows = [
    `КАРТОЧКА УЧЕТА ЖИВОТНОГО №: ${pet?.cardId || null}`,
    `Приют для животных по адресу: ${pet?.address || null}`,
    `Номер вольера: ${pet?.aviary}`,
    `Эксплуатирующая организация: ${pet?.operatingOrganizationId || null}`,
  ];

  const rowsExtra = [`${pet?.petTypeId === 2 ? "Собака" : "Кошка"}`];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {rows.map((row) => (
          <div className={styles.row}>{row}</div>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.miniContainer}>
          <div className={styles.photo}>
            <img src={image} alt="photo" />
          </div>
          <div className={styles.description}>
            {rowsExtra.map((row) => (
              <div>{row}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            //   onClick={exportWord}
          >
            <span>Сформирвать отчет</span>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
            //   onClick={downloadReport}
          >
            <span>Скачать отчет</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
