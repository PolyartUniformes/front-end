import Header from "../../layouts/header";
import styles from "./styles/index.module.css";
import { List } from "./components/list/main";

const Mapa = () => {
  return (
    <div className="nav">
      <Header />
      <div className={styles.main}>
        <List />
      </div>
    </div>
  );
};

export { Mapa };
