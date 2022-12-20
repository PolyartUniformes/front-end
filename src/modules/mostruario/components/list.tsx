import styles from "../styles/list.module.css";
import { Search } from "./search";

const MostruarioList = () => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>LISTA DE LOTES E PEÇAS</p>
      </div>
      <Search />
    </div>
  );
};

export { MostruarioList };
