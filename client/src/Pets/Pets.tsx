import React, { useEffect, useState } from "react";
import styles from "./Pets.module.css";
import Table from "../Table";
import { useHttp } from "../hooks/http.hook";

export interface IBreed {
  id: number;
  petTypeId: number;
  breed: string;
}

export interface IShelter {
  address: string;
  directorFio: string;
  id: number;
  phone: string;
  shortName: string;
  sub: string;
}

export const Pets = () => {
  // const [breedList, setBreedList] = useState<IBreed[]>();
  // const [shelterList, setShelterList] = useState<IShelter[]>();

  // const { request } = useHttp();

  // const getData = async () => {
  //   try {
  //     const breed = await request("/data/breedList");
  //     console.log("Data", breed);
  //     const shelter = await request("/data/shelterList");
  //     setBreedList(breed);
  //     console.log("Data", shelter);
  //     setShelterList(shelter);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className={styles.container}>
      Петы
      <Table />{" "}
    </div>
  );
};
