import { useState, useEffect } from "react";

import { BsJustify, BsDoorOpen } from "react-icons/bs";

import { Buttons } from "../utils/types";
import buttons from "./buttons";

import styles from "./styles/header.module.css";

import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    setPathname(document.location.pathname);
  }, []);

  return (
    <header className={styles.container}>
      <button onClick={changeState} className={styles.menu}>
        <BsJustify size={17} /> MENU
      </button>

      {expanded && (
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
