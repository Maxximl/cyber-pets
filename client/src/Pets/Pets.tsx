import React, { useContext, useEffect, useState } from "react";
import styles from "./Pets.module.css";
import Table from "../Table";
import { useHttp } from "../hooks/http.hook";
import { Data } from "../Table/Table";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
  const { dataset, data, shelterValue, setShelterValue } = useContext(
    AuthContext
  );
  const { request } = useHttp();

  const exportWord = () => {
    const obj = {
      id: 1,
    };

    var raw = JSON.stringify(obj);

    try {
      const data = request("/data/exportToWord", "PUT", obj);
    } catch (error) {
      console.log(error);
    }
  };
  const download = (filename: string, blob: Blob) => {
    var url = window.URL || window.webkitURL;
    var downloadUrl = url.createObjectURL(blob);

    var a = document.createElement("a");
    a.style.display = "none";

    // if (typeof a.download === "undefined") {
    //    window.location = downloadUrl;
    // } else {
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    // }
  };

  const downloadReport = async () => {
    try {
      fetch("/data/report")
        .then((response) => response.blob())
        .then((result) => {
          download("Report.docx", result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnShelterChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    setShelterValue(event.target.value as number);
  };

  return (
    <div className={styles.container}>
      <div className={styles.shelters}>
        <FormControl className={styles.dropdown}>
          <InputLabel id="demo-simple-select-outlined-label" required>
            Приют
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Age"
            required
            name="shelter"
            onChange={handleOnShelterChange}
            value={shelterValue}
          >
            {data?.shelterList?.map((shelter) => (
              <MenuItem value={shelter.id} key={shelter.id}>
                {shelter.shortName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={exportWord}
        >
          <span>Сформирвать отчет</span>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          onClick={downloadReport}
        >
          <span>Скачать отчет</span>
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <Table data={dataset} />{" "}
      </div>
    </div>
  );
};
