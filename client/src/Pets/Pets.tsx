import React, { useEffect, useState } from "react";
import styles from "./Pets.module.css";
import Table from "../Table";
import { useHttp } from "../hooks/http.hook";
import { Data } from "../Table/Table";

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
  const { request } = useHttp();
  const [data, setData] = useState<Data[]>([]);

  const setFilter = async () => {
    const obj = {
      gender: 1,
      size: 11,
    };

    var raw = JSON.stringify(obj);
    const header = {
      "Content-Type": "application/json",
    };

    try {
      const data = await request(`data/filter`, "POST", obj);
      setData(data.result || []);
      console.log(data.result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setFilter();
  }, []);

  return (
    <div className={styles.container}>
      Петы
      <Table data={data} />{" "}
    </div>
  );
};
