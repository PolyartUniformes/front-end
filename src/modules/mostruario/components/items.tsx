import styles from "../styles/list.module.css";
import { useState, ChangeEvent } from "react";
import { mostruario } from "../functions/mostruario";
import ModalMostruario from "./modal";

const Items = ({ items }: any) => {
  if (items.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        {items &&
          items.map((element: any, index: number) => {
            return (
              <div key={index}>
                <ModalMostruario element={element} />
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <i style={{ color: "red" }}>Nenhum dado encontrado!</i>
    </div>
  );
};

export { Items };
