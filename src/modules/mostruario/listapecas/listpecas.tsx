import styles from "../styles/list.module.css";
import { Search } from "./searchpecas";

const MostruarioListPecas = () => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>LISTA DE PEÇAS</p>
      </div>
      <Search />
    </div>
  );
};

export { MostruarioListPecas };
