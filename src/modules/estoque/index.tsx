import Header from "../../layouts/header";
import styles from "./styles/index.module.css";
import { List } from "./components/list/main";

const Estoque = () => {
  return (
    <div className="nav">
      <Header />
      <div className={styles.main}>
        <List />
      </div>
    </div>
  );
};

export { Estoque };
