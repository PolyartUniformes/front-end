import styles from "../styles/list.module.css";
import { Search } from "./hist-search";

const HistList = () => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>HISTÓRICO DE MOSTRUÁRIO</p>
      </div>
      <Search />
    </div>
  );
};

export { HistList };
