import { useState, useEffect } from "react";

import { BsJustify, BsDoorOpen } from "react-icons/bs";

import { Buttons } from "../utils/types";
import buttons from "./buttons";

import styles from "./styles/header.module.css";

import { useNavigate } from "react-router-dom";
import { admin } from "../services/admin";

import { BsJournalText, BsHouse } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>();
  const [pathname, setPathname] = useState<string>();

  function changeState() {
    setExpanded((c) => !c);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const [roles, setRoles] = useState("");

  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    setPathname(document.location.pathname);
    if (uuid) {
      const api = async () => {
        const data = await admin.me(uuid);
        setRoles(data.roles);
      };
      api();
    }
  }, []);

  return (
    <header className={styles.container}>
      <button onClick={changeState} className={styles.menu}>
        <BsJustify size={17} /> MENU
      </button>

      {roles && roles.indexOf("faccionista")
        ? expanded && (
            <div className={styles.buttonsContainer}>
              <button
                className={"/" === pathname ? styles.selected : styles.button}
                onClick={() => (location.href = "/")}
              >
                <BsHouse size={17} /> HOME
              </button>
              <button
                className={
                  "/faccao" === pathname ? styles.selected : styles.button
                }
                onClick={() => (location.href = "/faccao")}
              >
                <BsJournalText size={17} /> FACÇÃO
              </button>
            </div>
          )
        : expanded && (
            <div className={styles.buttonsContainer}>
              {buttons.map((element: Buttons, index: number) => {
                return (
                  <button
                    key={index}
                    className={
                      element.pathname === pathname
                        ? styles.selected
                        : styles.button
                    }
                    onClick={() => (location.href = element.pathname)}
                  >
                    {element.icon} {element.name.toUpperCase()}
                  </button>
                );
              })}
              <button className={styles.button} onClick={handleLogout}>
                <BsDoorOpen size={17} /> SAIR
              </button>
            </div>
          )}
    </header>
  );
}
