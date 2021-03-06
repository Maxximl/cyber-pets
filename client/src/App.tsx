import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./Header";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { Cameras } from "./Cameras";
import {
  AddDataPage,
  IColor,
  IEars,
  IHair,
  IPetType,
  ISizes,
  ITail,
} from "./AddDataPage";
import { Promo } from "./Promo";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./hooks/useRoutes";
import { IBreed, IShelter } from "./Pets";
import { useHttp } from "./hooks/http.hook";
import { Data } from "./Table/Table";

const dogs = [
  "http://animalslife.net/videos_for/Lesi_(Serbia)/anim_LesiBac_1506508463_9472Trim_part1.mp4",
  "http://animalslife.net/videos_for/Noahs_Ark_(Malta)/anim_Malta1_1506504551_11514Trim_Part1.mp4",
  "http://animalslife.net/videos_for/Penkta_Koja_shelter/Penkta_Koja_(Litva).mp4",
  "https://youtu.be/o7C4_TpcNuA",
];

const cats = [
  "blob:http://animalslife.net/513ae483-586f-43ae-93ef-fe05235b1a63",
  "http://animalslife.net/videos_for/Les%C4%97_Vilnius_(Lithuania)/anim_Lese_1506488358_24986Trim_Part1.mp4",
  "blob:http://animalslife.net/38042cfa-7336-48e1-9b84-3037f9508fce",
  "blob:http://animalslife.net/5b16401f-9f73-4cb4-abc3-2f9de0590dc4",
];
export interface IData {
  breedList: IBreed[];
  shelterList: IShelter[];
  tailList: ITail[];
  petTypeList: IPetType[];
  petColorTypes: IColor[];
  petHairTypes: IHair[];
  petEarsTypes: IEars[];
  petSizes: ISizes[];
  sexTypes: ISex[];
}

export interface ISex {
  id: number;
  sex: string;
}

export const App = () => {
  const { request } = useHttp();

  const [breedList, setBreedList] = useState<IBreed[]>([]);
  const [shelterList, setShelterList] = useState<IShelter[]>([]);
  const [tailList, setTailList] = useState<ITail[]>([]);
  const [petTypeList, setPetTypeList] = useState<IPetType[]>([]);
  const [petColorTypes, setPetColorTypes] = useState<IColor[]>([]);
  const [petHairTypes, setPetHairTypes] = useState<IHair[]>([]);
  const [petEarsTypes, setPetEarsTypes] = useState<IEars[]>([]);
  const [petSizes, setPetSizes] = useState<ISizes[]>([]);
  const [sexTypes, setSexTypes] = useState<ISex[]>([]);

  const [shelterValue, setShelterValue] = useState<number>(1);

  const data = {
    breedList,
    shelterList,
    tailList,
    petTypeList,
    petColorTypes,
    petHairTypes,
    petEarsTypes,
    petSizes,
    sexTypes,
  };

  const getData = async () => {
    try {
      const breed = await request("/data/breedList");
      const shelter = await request("/data/shelterList");
      setBreedList(breed.result);
      setShelterList(shelter.result);
      const tail = await request("/data/tailList");
      setTailList(tail.result);
      const type = await request("/data/petTypeList");
      setPetTypeList(type.result);
      const color = await request("/data/petColorTypes");
      setPetColorTypes(color.result);
      const hair = await request("/data/pethairtypes");
      setPetHairTypes(hair.result);
      const ears = await request("/data/petearstypes");
      setPetEarsTypes(ears.result);
      const size = await request("/data/petsizes");
      setPetSizes(size.result);
      const sex = await request("/data/petSexTypes");
      setSexTypes(sex.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [dataset, setDataset] = useState<Data[]>([]);

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
      const dataset = await request(`/data/petsByShelter/${shelterValue}`);
      setDataset(dataset.result || []);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setFilter();
  }, [shelterValue]);

  const { token, login, logout, userId } = useAuth();
  const authorized = !!token;
  const routes = useRoutes(authorized, dogs, cats);
  return (
    <AuthContext.Provider
      value={{
        isAuthentificated: authorized,
        login,
        logout,
        token,
        userId,
        dogs,
        cats,
        data,
        dataset,
        shelterValue,
        setShelterValue,
      }}
    >
      <Router>
        <Header />
        <div className={styles.App}>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
