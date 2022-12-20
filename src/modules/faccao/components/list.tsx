import styles from "../styles/list.module.css";
import { BsList, BsImages } from "react-icons/bs";
import { useState } from "react";
import { ListHeader } from "./listHeader";

function List() {
  const [list, setList] = useState(1);

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>LISTA DE ORDENS DE CORTE</p>
        {list === 1 ? (
          <button onClick={() => setList(17)}>
            <BsList size={17} />
          </button>
        ) : (
          <button onClick={() => setList(1)}>
            <BsImages size={17} />
          </button>
        )}
      </div>
      <ListHeader itemsLimit={list} />
    </div>
  );
}

export { List };
