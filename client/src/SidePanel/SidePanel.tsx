import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { SwipeableDrawer } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Close, Pets, LibraryBooks, Videocam } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export const TemporaryDrawer: React.FC<ISidePanelProps> = ({
  open,
  handleOnCloseClick,
}) => {
  const classes = useStyles();

  const toggleDrawer = (anchor: string, open: boolean) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  const list = (
    <div
    //   className={clsx(classes.list, {
    //     [classes.fullList]: anchor === "top" || anchor === "bottom",
    //   })}
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={handleOnCloseClick}>
          <Link to="/">Главная</Link>
        </ListItem>
        <ListItem button onClick={handleOnCloseClick}>
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <Link to="/pets">Животные</Link>
        </ListItem>
        <ListItem button onClick={handleOnCloseClick}>
          <ListItemIcon>
            <LibraryBooks />
          </ListItemIcon>
          <Link to="pets/add">Добавить</Link>
        </ListItem>
        <ListItem button onClick={handleOnCloseClick}>
          <ListItemIcon>
            <Videocam />
          </ListItemIcon>
          <Link to="/cameras/all">Камеры</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleOnCloseClick}>
          <ListItemIcon>
            <Close />
          </ListItemIcon>
          <ListItemText primary={"Закрыть"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {
        <React.Fragment key="left">
          <SwipeableDrawer
            anchor="left"
            open={open}
            onOpen={() => {}}
            onClose={handleOnCloseClick}
          >
            {list}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
};

export interface ISidePanelProps {
  open: boolean;
  handleOnCloseClick: () => void;
}
