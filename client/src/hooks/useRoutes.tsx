import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AddDataPage } from "../AddDataPage";
import { Camera } from "../Camera";
import { Cameras } from "../Cameras";
import { Content } from "../Content";
import { Header } from "../Header";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { Pets } from "../Pets";
import { Promo } from "../Promo";

export const useRoutes = (
  authorizated: boolean,
  dogs: string[],
  cats: string[]
) => {
  if (!authorizated) {
    return (
      <Switch>
        <Route path="/pets/add">
          <AddDataPage />
        </Route>
        <Route path="/" exact>
          <Promo />
        </Route>
        <Route path="/pets" exact>
          <Pets />
        </Route>
        <Route path="/cameras/:petType">
          <Cameras />
        </Route>
        <Route path="/camera/:id">
          <Camera dogs={dogs} cats={cats} />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/pets/add">
          <AddDataPage />
        </Route>
        <Route path="/" exact>
          <Promo />
        </Route>
        <Route path="/pets" exact>
          <Pets />
        </Route>
        <Route path="/cameras/:petType">
          <Cameras />
        </Route>
        <Route path="/camera/:id">
          <Camera dogs={dogs} cats={cats} />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
};
