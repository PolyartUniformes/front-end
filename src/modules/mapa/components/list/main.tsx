import styles from "../../styles/list.module.css";
import { Search } from "./search";

const List = () => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>LISTA DE TECIDOS NO ESTOQUE</p>
      </div>
      <Search />
    </div>
  );
};

export { List };
