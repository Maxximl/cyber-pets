import React, { useContext } from "react";
import styles from "./Cameras.module.css";
import { Navigator } from "../Navigator";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Cameras = () => {
  const { dogs, cats } = useContext(AuthContext);

  interface paramTypes {
    petType: string;
  }
  const { petType } = useParams<paramTypes>();
  let currentPets: string[];
  if (petType === "dogs") {
    currentPets = dogs;
  } else if (petType === "cats") {
    currentPets = cats;
  } else {
    currentPets = [...dogs, ...cats];
  }
  return (
    <div className={styles.container}>
      <Navigator />
      <div className={styles.cameras_containter}>
        {currentPets.map((video, idx) => {
          return (
            <div className={styles.camera_preview} key={video}>
              <Link to={`/camera/${idx}`}>
                <video src={video} controls autoPlay muted></video>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
