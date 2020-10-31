import React, { useEffect, useState } from "react";
import styles from "./Pets.module.css";
import Table from "../Table";
import { useHttp } from "../hooks/http.hook";
import { Data } from "../Table/Table";
import { Button, InputLabel } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

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
          download("doc.docx", result);
        });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
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
        <Table data={data} />{" "}
      </div>
    </div>
  );
};
