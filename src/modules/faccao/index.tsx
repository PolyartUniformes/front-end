import Header from "../../layouts/header";
import { List } from "./components/list";
import { Create } from "./components/create";
import styles from "./styles/index.module.css";
import Panel from "./panel/main";

export function Faccao() {
  return (
    <div className="nav">
      <Header />
      <div className={styles.container}>
        <div className={styles.box}>
          <List />
        </div>

        <div className={styles.box}>
          <Create />
        </div>
      </div>

      <div className={styles.subContainer}>
        <div className={styles.box}>
          <Panel />
        </div>
      </div>
    </div>
  );
}
