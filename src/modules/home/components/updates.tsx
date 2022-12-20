import update from "../../../json/updates.json";
import styles from "../styles/home.module.css";
import { useState } from "react";

function Updates() {
  const [item, setItem] = useState<number>();

  return (
    <div className={styles.container}>
      {update.map((element, index) => {
        return (
          <div key={index} className={styles.box}>
            <div className={styles.boxTitle} onClick={() => setItem(index)}>
              <p>{element.title}</p> <p>{element.date}</p>
            </div>
            {item === index
              ? element.description.split("\n").map((e, i) => {
                  return <p key={i + 1}>{e}</p>;
                })
              : null}
          </div>
        );
      })}
    </div>
  );
}

export default Updates;
