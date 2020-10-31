import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Camera.module.css";
interface ICameraProps {
  dogs: string[];
  cats: string[];
}
interface IParamProps {
  id: string;
}
export const Camera = (props: ICameraProps) => {
  const { id } = useParams<IParamProps>();

  const { cats, dogs } = props;
  const pets = [...dogs, ...cats];
  return (
    <div className={styles.container}>
      <video src={pets[parseFloat(id)]} controls autoPlay></video>
    </div>
  );
};
