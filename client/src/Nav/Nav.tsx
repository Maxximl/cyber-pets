import React, { useContext, useState } from "react";
import styles from "./Nav.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import Button from "@material-ui/core/Button/Button";
import { AccountCircle, Search, Pets, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { TemporaryDrawer } from "../SidePanel";
import { AuthContext } from "../context/AuthContext";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthentificated, logout } = useContext(AuthContext);

  const handleOnLoginClick = () => {};
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.nav_wrapper}>
      <div className={styles.menu}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setMenuOpen(true)}
        >
          <AiOutlineMenu className={styles.menu_icon} />
        </Button>
        <TemporaryDrawer
          open={menuOpen}
          handleOnCloseClick={() => setMenuOpen(false)}
        />
      </div>
      <Link to="" className={styles.logo}>
        <Pets />
        Cyber Dogs
      </Link>
      <div className={styles.nav}>
        <Link to="/">
          <span className={styles.link}>Главная</span>
        </Link>
        <Link to="/pets">
          <span className={styles.link}>Питомцы</span>
        </Link>
        <Link to="/cameras/all">
          <span className={styles.link}>Камеры</span>
        </Link>
        <Link to="/pets/add">
          <span className={styles.link}>Добавить питомца</span>
        </Link>
      </div>
      <div className={styles.user}>
        <a href="">
          <span className={styles.search_loupe}>
            <Search color={"primary"} />
          </span>
        </a>
        {isAuthentificated ? (
          <Link to="auth">
            <span className={styles.login} onClick={handleLogout}>
              {<ExitToApp />}
            </span>
          </Link>
        ) : (
          <Link to="/auth">
            <span className={styles.login}>
              {<AccountCircle color={"primary"} />}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};
