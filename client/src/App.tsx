import React from "react";
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
import { AddDataPage } from "./AddDataPage";
import { Promo } from "./Promo";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./hooks/useRoutes";

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

export const App = () => {
  const { token, login, logout, userId } = useAuth();
  const authorized = !!token;
  const routes = useRoutes(authorized, dogs, cats);
  console.log(authorized);
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
