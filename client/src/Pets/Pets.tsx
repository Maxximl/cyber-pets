import React, { useEffect, useState } from "react";
import styles from "./Pets.module.css";
import Table from "../Table";
import { useHttp } from "../hooks/http.hook";
import { Data } from "../Table/Table";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";

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
      const data = await request(`data/filter`, "POST");
      setData(data.result || []);
      console.log(data.result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setFilter();
  }, []);

  // cosnt reportHandler = () => {

  // }

  const exportWord = () => {
    const obj = {
      id: 1,
    };

    var raw = JSON.stringify(obj);

    try {
      const data = request("/data/exportToWord", "PUT", obj);

      console.log("response status", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <Table data={data} />{" "}
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={exportWord}
        >
          <span>Сформирвать отчет</span>
        </Button>
      </div>
    </div>
  );
};
